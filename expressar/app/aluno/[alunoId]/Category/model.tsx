import { useEffect, useState } from 'react'
import {Alert} from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { buscarPictogramas } from '@/services/arasaac/arasaacService'
import { usePictogramas } from '@/hooks/usePictogramas'

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

export default function useCategoryModel() {
  const router = useRouter()
  const [nomeAluno, setNomeAluno] = useState('')
  const [alunoId, setAlunoId] = useState('')

  // Verifica AsyncStorage — redireciona para código se não tiver aluno salvo
  useEffect(() => {
    async function verificarAluno() {
      const id = await AsyncStorage.getItem('aluno_id')
      const nome = await AsyncStorage.getItem('aluno_nome')

      if (!id || !nome) {
        // Sem código salvo — pede para digitar
        router.replace('/aluno')
        return
      }

      setAlunoId(id)
      setNomeAluno(nome)
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
            await AsyncStorage.removeItem('aluno_id')
            await AsyncStorage.removeItem('aluno_nome')
            await AsyncStorage.removeItem('aluno_codigo')
            router.replace('/')
          },
        },
      ]
    )
  }


  async function handleCategoria(categoriaId: string, categoriaNome: string) {
  try {
    // depois navega
    router.push({
      pathname: `/aluno/${alunoId}/Category/${categoriaId}`,
      params: { nome: categoriaNome }
    })

  } catch (erro) {
    console.log('ERRO API:', erro)
  }
}

  return {
    nomeAluno,
    categorias : CATEGORIAS,
    handleSair,
    handleCategoria,
  }
}