import { useState } from 'react'
import { useRouter } from 'expo-router'

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

    setLoading(true)

    try {
      // 🔥 depois você conecta com Supabase aqui
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Login realizado:', email)

      router.replace('/home') // 👈 ajusta depois
    } catch (e) {
      setErro('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  function handleCriarConta() {
    router.push('professor/auth/register') // 👈 rota futura
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