import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useLocalSearchParams } from "expo-router"

type Categoria = {
  id: string
  nome: string
  imagem: string | null
  total_cartoes: number
  total_subcategorias: number
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

      const categoriasComTotais = await Promise.all(
        (categoriasData || []).map(async (categoria) => {
          const [
            { count: totalCartoes, error: countCartoesError },
            { count: totalSubcategorias, error: countSubcategoriasError },
          ] = await Promise.all([
            supabase
              .from("cartoes")
              .select("*", { count: "exact", head: true })
              .eq("categoria_id", categoria.id)
              .eq("turma_id", turmaId),

            supabase
              .from("subcategorias")
              .select("*", { count: "exact", head: true })
              .eq("categoria_id", categoria.id),
          ])

          if (countCartoesError) throw countCartoesError
          if (countSubcategoriasError) throw countSubcategoriasError

          return {
            ...categoria,
            total_cartoes: totalCartoes ?? 0,
            total_subcategorias: totalSubcategorias ?? 0,
          }
        })
      )

      setCategorias(categoriasComTotais)
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