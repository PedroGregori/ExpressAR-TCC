import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ============================================================
// Categorias fixas do MVP
// ============================================================
const CATEGORIAS = [
  { id: '1', nome: 'Comidas',      emoji: '🍎', cor: '#FF8A65' },
  { id: '2', nome: 'Emoções',      emoji: '😊', cor: '#FFB74D' },
  { id: '3', nome: 'Escola',       emoji: '🎒', cor: '#81C784' },
  { id: '4', nome: 'Necessidades', emoji: '🚿', cor: '#64B5F6' },
  { id: '5', nome: 'Comunicação',  emoji: '💬', cor: '#BA68C8' },
]

const CATEGORIAS_COM_SUB = ['Comidas', 'Escola']

export default function useCategoryModel() {
  const router = useRouter()
  const [nomeAluno, setNomeAluno] = useState('')
  const [alunoId, setAlunoId] = useState('')

  useEffect(() => {
    async function verificarAluno() {
      const alunoStorage = await AsyncStorage.getItem('aluno')

      if (!alunoStorage) {
        router.replace('/aluno')
        return
      }

      const aluno = JSON.parse(alunoStorage)

      setAlunoId(aluno.id)
      setNomeAluno(aluno.nome)
    }

    verificarAluno()
  }, [])

  function handleSair() {
    Alert.alert(
      'Sair do perfil',
      `Deseja sair do perfil de ${nomeAluno}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('aluno')
            router.replace('/HomeScreen')
          },
        },
      ]
    )
  }

  async function handleCategoria(categoriaId: string, categoriaNome: string) {
    const temSub = CATEGORIAS_COM_SUB.includes(categoriaNome)

    if (temSub) {
      router.push({
        pathname: '/aluno/[id]/Category/SubCategory',
        params: {
          id: alunoId,
          nome: categoriaNome
        }
      })
    } else {
      router.push({
        pathname: '/aluno/[id]/Category/CategoryDetail',
        params: {
          id: alunoId,
          nome: categoriaNome
        }
      })
    }
  }

  return {
    nomeAluno,
    categorias: CATEGORIAS,
    handleSair,
    handleCategoria,
  }
}