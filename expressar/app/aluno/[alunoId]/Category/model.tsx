import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '@/lib/supabase'

type Categoria = {
  id: string
  nome: string
  imagem?: string
  tem_subcategoria: boolean
}

export default function useCategoryModel() {
  const router = useRouter()

  const [nomeAluno, setNomeAluno] = useState('')
  const [alunoId, setAlunoId] = useState('')
  const [turmaId, setTurmaId] = useState('')
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      setLoading(true)

      const alunoStorage = await AsyncStorage.getItem('aluno')

      if (!alunoStorage) {
        router.replace('/aluno')
        return
      }

      const aluno = JSON.parse(alunoStorage)

      setAlunoId(aluno.id)
      setNomeAluno(aluno.nome)
      setTurmaId(aluno.turma_id)

      const { data, error } = await supabase
        .from('categorias')
        .select('id, nome, imagem, tem_subcategoria')
        .eq('turma_id', aluno.turma_id)
        .order('created_at', { ascending: true })

      if (error) throw error

      if (data) {
        setCategorias(data)
      }
    } catch (e) {
      console.log('Erro ao buscar categorias:', e)
    } finally {
      setLoading(false)
    }
  }

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

  function handleCategoria(categoria: Categoria) {
    if (categoria.tem_subcategoria) {
      router.push({
        pathname: '/aluno/[id]/Category/SubCategory',
        params: {
          id: alunoId,
          categoriaId: categoria.id,
          nome: categoria.nome,
        },
      })
    } else {
      router.push({
        pathname: '/aluno/[id]/Category/CategoryDetail',
        params: {
          id: alunoId,
          categoriaId: categoria.id,
          nome: categoria.nome,
        },
      })
    }
  }

  return {
    nomeAluno,
    turmaId,
    categorias,
    loading,
    handleSair,
    handleCategoria,
  }
}