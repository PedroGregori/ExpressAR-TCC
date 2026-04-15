import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useLocalSearchParams } from "expo-router"

type Categoria = {
  id: string
  nome: string
  imagem: string | null
  total_cartoes: number
}

export default function useCategoriasTurmaModel() {
  const router = useRouter()
  const { turmaId, nomeTurma, professor } = useLocalSearchParams<{
    turmaId: string
    nomeTurma: string
    professor?: string
  }>()

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    buscarCategorias()
  }, [])

  async function buscarCategorias() {
    try {
      setLoading(true)

      const { data: categoriasData, error } = await supabase
        .from("categorias")
        .select("id, nome, imagem")
        .eq("turma_id", turmaId)

      if (error) throw error

      const categoriasComTotal = await Promise.all(
        (categoriasData || []).map(async (categoria) => {
          const { count, error: countError } = await supabase
            .from("cartoes")
            .select("*", { count: "exact", head: true })
            .eq("categoria_id", categoria.id)
            .eq("turma_id", turmaId)

          if (countError) throw countError

          return {
            ...categoria,
            total_cartoes: count ?? 0,
          }
        })
      )

      setCategorias(categoriasComTotal)
    } catch (e) {
      console.log("Erro ao buscar categorias:", e)
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  function irAdicionarCategoria() {
    router.push({
      pathname: "/professor/Home/cartoes/manageCategory/createCategory/[turmaId]",
      params: {
        turmaId,
        nomeTurma,
        professor,
      },
    })
  }

  function irDetalheCategoria(categoriaId: string, nomeCategoria: string) {
    router.push({
      pathname: "/professor/Home/cartoes/manageCategory/categoryInfo/[categoriaId]",
      params: {
        categoriaId,
        turmaId,
        nomeTurma,
        nomeCategoria,
        professor,
      },
    })
  }

  return {
    nomeTurma,
    categorias,
    loading,
    voltar,
    irAdicionarCategoria,
    irDetalheCategoria,
  }
}