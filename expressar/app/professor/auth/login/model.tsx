import { useState } from 'react'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'

export default function useLoginModel() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  function handleEmail(text: string) {
    setEmail(text)
    setErro('')
  }

  function handleSenha(text: string) {
    setSenha(text)
    setErro('')
  }

  async function handleLogin() {
    if (!email || !senha) {
      setErro('Preencha todos os campos')
      return
    }

    if (loading) return

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (error) throw error

      const user = data.user

      if (!user) {
        setErro('Usuário não encontrado')
        return
      }

      // 🔥 verifica se existe professor vinculado
      const { data: professor, error: profError } = await supabase
        .from('professores')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profError || !professor) {
        setErro('Professor não cadastrado')
        return
      }

      // ✅ login OK
      router.push('professor/Home')

    } catch (e: any) {
      if (e.message.includes('Invalid login credentials')) {
        setErro('Email ou senha inválidos')
      } else {
        setErro('Erro ao fazer login')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleCriarConta() {
    router.push('/professor/auth/register')
  }

  function handleEsqueciSenha() {
    console.log('Recuperar senha')
  }

  return {
    email,
    senha,
    loading,
    erro,
    handleEmail,
    handleSenha,
    handleLogin,
    handleCriarConta,
    handleEsqueciSenha,
  }
}