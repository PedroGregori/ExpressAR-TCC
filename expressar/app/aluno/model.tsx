import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserLogged } from '@/hooks/useUserLogged'

// ============================================================
// MOCK — substituir pela chamada real do Supabase futuramente
// ============================================================
const MOCK_ALUNOS = [
  {
    id: '1',
    nome: 'Maria Silva',
    codigo: 'ALU-0001',
    turma_id: 'turma-1',
    foto_url: null,
  },
  {
    id: '2',
    nome: 'Pedro Silva',
    codigo: 'ALU-0002',
    turma_id: 'turma-2',
    foto_url: null,
  },
]

async function buscarAlunoPorCodigo(codigo: string) {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800))

  return (
    MOCK_ALUNOS.find(
      (aluno) => aluno.codigo === codigo.toUpperCase().trim()
    ) ?? null
  )
}

export default function useClassCodeModel() {
  const router = useRouter()

  // 🔐 Hook de sessão
  const { alunoId, loading } = useUserLogged()

  // 🎯 Estados
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  // 🚀 Redireciona automaticamente se já estiver logado
  useEffect(() => {
    if (!loading && alunoId) {
      router.replace(`/aluno/${alunoId}`)
    }
  }, [alunoId, loading])

  // ✏️ Atualiza o código digitado
  function handleTrocarCodigo(text: string) {
    setCodigo(text)
    setErro('')
  }

  // ✅ Confirma código
  async function handleConfirmar() {
    if (!codigo.trim()) {
      setErro('Digite o código do aluno.')
      return
    }

    setErro('')
    setCarregando(true)

    try {
      const aluno = await buscarAlunoPorCodigo(codigo)

      if (!aluno) {
        setErro('Código inválido. Verifique e tente novamente.')
        return
      }

      // 💾 Salva no AsyncStorage
      await AsyncStorage.setItem('aluno_id', aluno.id)
      await AsyncStorage.setItem('aluno_nome', aluno.nome)
      await AsyncStorage.setItem('aluno_codigo', aluno.codigo)

      // 🔄 Redireciona
      router.replace(`/aluno/${aluno.id}`)
    } catch (e) {
      setErro('Erro ao verificar o código. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return {
    codigo,
    erro,
    carregando: carregando || loading, // 👈 une loading inicial + requisição
    handleTrocarCodigo,
    handleConfirmar,
  }
}