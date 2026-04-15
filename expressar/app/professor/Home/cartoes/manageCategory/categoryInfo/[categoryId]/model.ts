import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useLocalSearchParams, useRouter } from "expo-router"

type Subcategoria = {
  id: string
  nome: string
  imagem: string | null
}

export default function useManageCategoryModel() {
  const router = useRouter()

  const {
    categoriaId,
    turmaId,
    nomeCategoria,
  } = useLocalSearchParams<{
    categoriaId: string
    turmaId: string
    nomeCategoria: string
  }>()

  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (categoriaId) {
      buscarSubcategorias()
    }
  }, [categoriaId])

  async function buscarSubcategorias() {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("subcategorias")
        .select("id, nome, imagem")
        .eq("categoria_id", categoriaId)
        .order("created_at", { ascending: true })

      if (error) throw error

      setSubcategorias(data || [])
    } catch (e) {
      console.log("Erro ao buscar subcategorias:", e)
      setSubcategorias([])
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  function irCriarSubcategoria() {
    router.push({
      pathname: "/professor/Home/cartoes/createSubCategory",
      params: {
        categoriaId,
        turmaId,
        nomeCategoria,
      },
    })
  }

  function irCriarCartao() {
    router.push({
      pathname: "/professor/Home/cartoes/createCard/[turmaId]",
      params: {
        turmaId,
        categoriaId,
        nomeCategoria,
      },
    })
  }

  function irGerenciarSubcategoria(subcategoriaId: string, nomeSubcategoria: string) {
    router.push({
      pathname: "/professor/Home/cartoes/manageSubCategory",
      params: {
        subcategoriaId,
        categoriaId,
        turmaId,
        nomeCategoria,
        nomeSubcategoria,
      },
    })
  }

  return {
    nomeCategoria,
    subcategorias,
    loading,
    voltar,
    irCriarSubcategoria,
    irCriarCartao,
    irGerenciarSubcategoria,
  }
}