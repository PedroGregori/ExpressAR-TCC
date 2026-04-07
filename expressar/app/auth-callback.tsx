import { useEffect } from 'react'
import { useRouter } from 'expo-router'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Quando o app recebe o deep link, o listener de auth já vai disparar
    // Aqui só redirecionamos para home
    router.replace('/HomeScreen')
  }, [])

  return null
}