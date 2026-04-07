import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserLogged } from '@/hooks/useUserLogged'
import { getAlunoByCodigo } from '@/services/supabase/alunosService'

export default function useClassCodeModel() {
  const router = useRouter()

  const { alunoId, loading } = useUserLogged()

  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (!loading && alunoId) {
      router.replace({
        pathname: '/aluno/[id]/Category',
        params: { id: alunoId }
      })
    }
  }, [alunoId, loading])

  function handleTrocarCodigo(text: string) {
    setCodigo(text.toUpperCase())
    setErro('')
  }

  async function handleConfirmar() {
    if (!codigo.trim()) {
      setErro('Digite o código do aluno.')
      return
    }

    setErro('')
    setCarregando(true)

    try {
      const aluno = await getAlunoByCodigo(codigo)

      if (!aluno) {
        setErro('Código inválido.')
        return
      }

      // ✅ salva objeto completo
      await AsyncStorage.setItem('aluno', JSON.stringify(aluno))

      router.replace({
        pathname: '/aluno/[id]/Category',
        params: { id: aluno.id }
      })

    } catch {
      setErro('Erro ao verificar o código.')
    } finally {
      setCarregando(false)
    }
  }

  return {
    codigo,
    erro,
    carregando: carregando || loading,
    handleTrocarCodigo,
    handleConfirmar,
  }
}