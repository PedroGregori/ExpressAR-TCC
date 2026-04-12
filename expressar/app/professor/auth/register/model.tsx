import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import * as QueryParams from 'expo-auth-session/build/QueryParams'

WebBrowser.maybeCompleteAuthSession()

export default function useRegisterModel() {
  const router = useRouter()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [escola, setEscola] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  // 🔥 AUTO LOGIN + LISTENER GLOBAL
  useEffect(() => {

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const user = session.user
          await salvarProfessor(user.id, user.email ?? '', user.user_metadata?.full_name ?? '')
          router.replace('/Home')
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])



  // 🔹 Handlers de input
  const handleNome = (text: string) => { setNome(text); setErro('') }
  const handleEmail = (text: string) => { setEmail(text); setErro('') }
  const handleEscola = (text: string) => { setEscola(text); setErro('') }
  const handleSenha = (text: string) => { setSenha(text); setErro('') }
  const handleConfirmarSenha = (text: string) => { setConfirmarSenha(text); setErro('') }

  // 🔐 CADASTRO NORMAL
  async function handleCadastro() {
    if (!nome || !email || !escola || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos')
      return
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({ email, password: senha })
      if (error) throw error

      const user = data.user
      if (user) {
        await salvarProfessor(user.id, email, nome, escola) // salva usando auth_id
      }

      router.replace('/Home')
    } catch (e: any) {
      setErro(e.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  // 🔵 LOGIN COM GOOGLE
  async function handleGoogleLogin() {
    try {
      setErro('')
      setLoading(true)

      const redirectUri = Linking.createURL('auth-callback')
      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: redirectUri, skipBrowserRedirect: true },
      })

      if (signInError) throw signInError
      if (!data?.url) throw new Error('Não foi possível gerar a URL de login')

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri)

      if (result.type === 'success' && result.url) {
        const { params } = QueryParams.getQueryParams(result.url)
        if (params.code) {
          const { data: sessionData, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(params.code as string)
          if (exchangeError) throw exchangeError

          const user = sessionData?.session?.user
          if (user) {
            await salvarProfessor(user.id, user.email ?? '', user.user_metadata?.full_name ?? '')
          }
          router.replace('/Home')
        }
      }
    } catch (e) {
      console.log('Erro Google Login:', e)
      setErro('Erro ao entrar com Google')
    } finally {
      setLoading(false)
    }
  }

  // 🔥 SALVAR PROFESSOR (sem sobrescrever id do banco)
  async function salvarProfessor(
    authId: string,
    email: string,
    nome?: string,
    escolaParam?: string
  ) {
    const { data: existing } = await supabase
      .from('professores')
      .select('*')
      .eq('id', authId)
      .maybeSingle()

    if (existing) {
      await supabase.from('professores').update({
        nome: nome || existing.nome,
        email: email || existing.email,
        escola: escolaParam ?? existing.escola, // 🔥 CORRETO
      }).eq('id', authId)
    } else {
      await supabase.from('professores').insert({
        id: authId,
        email,
        nome,
        escola: escolaParam || '',
      })
    }
  }

  return {
    nome, email, escola, senha, confirmarSenha, loading, erro,
    handleNome, handleEmail, handleEscola, handleSenha, handleConfirmarSenha,
    handleCadastro, handleGoogleLogin
  }
}