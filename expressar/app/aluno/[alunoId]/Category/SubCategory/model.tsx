import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Alert } from 'react-native'

type Subcategoria = {
  id: string
  nome: string
  emoji: string
  cor: string
}

const SUBCATEGORIAS_MAP: Record<string, Subcategoria[]> = {
  Comidas: [
    { id: '1', nome: 'Frutas', emoji: '🍎', cor: '#FF8A65' },
    { id: '2', nome: 'Bebidas', emoji: '🥤', cor: '#4FC3F7' },
    { id: '3', nome: 'Almoço', emoji: '🍛', cor: '#AED581' },
  ],
  Escola: [
    { id: '4', nome: 'Pessoas', emoji: '👩‍🏫', cor: '#81C784' },
    { id: '5', nome: 'Matérias', emoji: '📚', cor: '#64B5F6' },
  ],
}

export default function useSubCategoryModel() {
  const router = useRouter()
  const { nome, alunoId } = useLocalSearchParams()

  const categoriaNome = String(nome || '').trim()

  const subcategorias =
    SUBCATEGORIAS_MAP[categoriaNome] ??
    SUBCATEGORIAS_MAP[categoriaNome.toLowerCase()] ??
    []

  function handleSubcategoria(subNome: string) {
    router.push({
      pathname: `/aluno/${alunoId}/Category/CategoryDetail`,
      params: { nome: subNome },
    })
  }

  function handleVoltar() {
    router.back()
  }

  function handleSair() {
  Alert.alert(
    'Sair do perfil',
    `Deseja sair do perfil de ${nome}?`,
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('aluno')
          router.replace('/aluno')
        },
      },
    ]
  )
}

  return {
    subcategorias,
    handleSubcategoria,
    handleVoltar,
    handleSair
  }
}