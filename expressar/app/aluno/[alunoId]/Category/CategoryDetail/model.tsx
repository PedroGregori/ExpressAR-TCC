import { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'

type Cartao = {
  id: string
  nome: string
  imagem: string
}

export default function useCategoryDetail() {
  const { categoriaId, subcategoriaId } = useLocalSearchParams<{
    categoriaId: string
    subcategoriaId?: string
  }>()

  const router = useRouter()

  const [cartoes, setCartoes] = useState<Cartao[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (categoriaId) {
      buscarCartoes()
    }
  }, [categoriaId, subcategoriaId])

  async function buscarCartoes() {
    try {
      setLoading(true)
      setErro('')

      let query = supabase
        .from('cartoes')
        .select('id, nome, imagem')
        .eq('categoria_id', categoriaId)

      // 👉 se tiver subcategoria, filtra também
      if (subcategoriaId) {
        query = query.eq('subcategoria_id', subcategoriaId)
      }

      const { data, error } = await query

      if (error) throw error

      setCartoes(data || [])
    } catch (e) {
      console.log('Erro ao buscar cartões:', e)
      setErro('Erro ao carregar cartões')
      setCartoes([])
    } finally {
      setLoading(false)
    }
  }

  function handleVoltar() {
    router.back()
  }

  return {
    cartoes,
    loading,
    erro,
    handleVoltar,
  }
}