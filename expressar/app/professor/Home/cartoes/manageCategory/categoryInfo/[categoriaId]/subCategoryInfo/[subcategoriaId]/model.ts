import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useLocalSearchParams, useRouter } from "expo-router"

type Cartao = {
  id: string
  nome: string
  imagem: string | null
}

export default function useManageSubCategoryModel() {
  const router = useRouter()

  const {
    subcategoriaId,
    categoriaId,
    turmaId,
    nomeCategoria,
    nomeSubcategoria,
  } = useLocalSearchParams<{
    subcategoriaId: string
    categoriaId: string
    turmaId: string
    nomeCategoria: string
    nomeSubcategoria: string
  }>()

  const [cartoes, setCartoes] = useState<Cartao[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (subcategoriaId && turmaId) {
      buscarCartoes()
    }
  }, [subcategoriaId, turmaId])

  async function buscarCartoes() {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("cartoes")
        .select("id, nome, imagem")
        .eq("subcategoria_id", subcategoriaId)
        .eq("turma_id", turmaId)
        .order("created_at", { ascending: true })

      if (error) throw error

      setCartoes(data || [])
    } catch (e) {
      console.log("Erro ao buscar cartões da subcategoria:", e)
      setCartoes([])
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  function irCriarCartao() {
    router.push({
      pathname: "/professor/Home/cartoes/createCard/[turmaId]",
      params: {
        turmaId,
        categoriaId,
        subcategoriaId,
        nomeCategoria,
        nomeSubcategoria,
        destino: "subcategoria",
      },
    })
  }

  function irGerenciarCartao(cartaoId: string, nomeCartao: string) {
    router.push({
      pathname: "/professor/Home/cartoes/manageCard/[cartaoId]",
      params: {
        cartaoId,
        categoriaId,
        subcategoriaId,
        turmaId,
        nomeCategoria,
        nomeSubcategoria,
        nomeCartao,
      },
    })
  }

  return {
    nomeSubcategoria,
    cartoes,
    loading,
    voltar,
    irCriarCartao,
    irGerenciarCartao,
  }
}