import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useLocalSearchParams, useRouter } from "expo-router"

type Subcategoria = {
  id: string
  nome: string
  imagem: string | null
  categoria_id: string
  turma_id: string
  subcategoria_base_id: string | null
}

type Cartao = {
  id: string
  nome: string
  imagem: string | null
  subcategoria_id?: string | null
}

export default function useManageCategoryModel() {
  const router = useRouter()

  const { categoriaId, turmaId, nomeCategoria } = useLocalSearchParams<{
    categoriaId: string
    turmaId: string
    nomeCategoria: string
  }>()

  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([])
  const [cartoes, setCartoes] = useState<Cartao[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (categoriaId && turmaId) {
      buscarDados()
    }
  }, [categoriaId, turmaId])

  async function buscarDados() {
    try {
      setLoading(true)

      const [
        { data: subcategoriasData, error: subcategoriasError },
        { data: cartoesData, error: cartoesError },
      ] = await Promise.all([
        supabase
          .from("subcategorias")
          .select("id, nome, imagem, categoria_id, turma_id, subcategoria_base_id")
          .eq("categoria_id", categoriaId)
          .eq("turma_id", turmaId)
          .order("created_at", { ascending: true }),

        supabase
          .from("cartoes")
          .select("id, nome, imagem, subcategoria_id")
          .eq("categoria_id", categoriaId)
          .eq("turma_id", turmaId)
          .order("created_at", { ascending: true }),
      ])

      if (subcategoriasError) throw subcategoriasError
      if (cartoesError) throw cartoesError

      const cartoesDaCategoria = (cartoesData || []).filter(
        (cartao) =>
          cartao.subcategoria_id === null ||
          cartao.subcategoria_id === undefined
      )

      setSubcategorias(subcategoriasData || [])
      setCartoes(cartoesDaCategoria)
    } catch (e) {
      console.log("Erro ao buscar dados da categoria:", e)
      setSubcategorias([])
      setCartoes([])
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  function irCriarSubcategoria() {
    router.push({
      pathname: "/professor/Home/cartoes/manageCategory/categoryInfo/[categoriaId]/createSubCategory",
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

  function irGerenciarSubcategoria(
    subcategoriaId: string,
    nomeSubcategoria: string
  ) {
    router.push({
      pathname:
        "/professor/Home/cartoes/manageCategory/categoryInfo/[categoriaId]/subCategoryInfo/[subcategoriaId]",
      params: {
        subcategoriaId,
        categoriaId,
        turmaId,
        nomeCategoria,
        nomeSubcategoria,
      },
    })
  }

  function irGerenciarCartao(cartaoId: string, nomeCartao: string) {
    router.push({
      pathname: "/professor/Home/cartoes/manageCard/[cartaoId]",
      params: {
        cartaoId,
        categoriaId,
        turmaId,
        nomeCategoria,
        nomeCartao,
      },
    })
  }

  return {
    nomeCategoria,
    subcategorias,
    cartoes,
    loading,
    voltar,
    irCriarSubcategoria,
    irCriarCartao,
    irGerenciarSubcategoria,
    irGerenciarCartao,
  }
}