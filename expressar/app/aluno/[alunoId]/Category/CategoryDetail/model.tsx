import { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '@/lib/supabase'

type Cartao = {
  id: string
  nome: string
  imagem: string
  turma_id: string
  categoria_id: string
  subcategoria_id: string | null
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
        .select('id, nome, imagem, turma_id, categoria_id, subcategoria_id')
        .eq('categoria_id', categoriaId)

      if (subcategoriaId) {
        query = query.eq('subcategoria_id', subcategoriaId)
      } else {
        query = query.is('subcategoria_id', null)
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

  async function registrarInteracaoCartao(cartao: Cartao) {
    try {
      const alunoStorage = await AsyncStorage.getItem('aluno')

      if (!alunoStorage) return

      const aluno = JSON.parse(alunoStorage)

      const { error } = await supabase.from('interacoes_cartoes').insert({
        aluno_id: aluno.id,
        turma_id: cartao.turma_id,
        cartao_id: cartao.id,
        categoria_id: cartao.categoria_id,
        subcategoria_id: cartao.subcategoria_id ?? null,
      })

      if (error) throw error
    } catch (e) {
      console.log('Erro ao registrar interação do cartão:', e)
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
    registrarInteracaoCartao,
  }
}