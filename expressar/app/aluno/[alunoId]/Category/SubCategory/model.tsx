import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Alert } from 'react-native'
import { supabase } from '@/lib/supabase'

type Subcategoria = {
  id: string
  nome: string
  imagem?: string
}

export default function useSubCategoryModel() {
  const router = useRouter()

  const { nome, id, categoriaId } = useLocalSearchParams<{
    nome: string
    id: string
    categoriaId: string
  }>()

  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([])
  const [loading, setLoading] = useState(false)

  // 🔥 BUSCAR DO BANCO
  useEffect(() => {
    buscarSubcategorias()
  }, [])

  async function buscarSubcategorias() {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('subcategorias')
        .select('*')
        .eq('categoria_id', categoriaId)

      if (error) throw error

      if (data) {
        setSubcategorias(data)
      }
    } catch (e) {
      console.log('Erro ao buscar subcategorias:', e)
    } finally {
      setLoading(false)
    }
  }

  function handleSubcategoria(sub: Subcategoria) {
    router.push({
      pathname: `/aluno/${id}/Category/CategoryDetail`,
      params: {
        nome: sub.nome,
        subcategoriaId: sub.id,
      },
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
    loading,
    handleSubcategoria,
    handleVoltar,
    handleSair,
  }
}