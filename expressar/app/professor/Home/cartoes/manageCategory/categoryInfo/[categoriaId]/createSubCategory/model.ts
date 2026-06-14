import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useLocalSearchParams, useRouter } from "expo-router"

export default function useCriarSubcategoriaModel() {
  const router = useRouter()

  const {
    categoriaId,
    turmaId,
    nomeCategoria,
    imagem: imagemParam,
  } = useLocalSearchParams<{
    categoriaId: string
    turmaId: string
    nomeCategoria: string
    imagem?: string
  }>()

  const [nome, setNome] = useState("")
  const [imagem, setImagem] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (imagemParam) {
      setImagem(imagemParam)
    }
  }, [imagemParam])

  async function criarSubcategoria() {
    try {
      if (!nome.trim()) return

      setLoading(true)

      const { error } = await supabase.from("subcategorias").insert({
        nome: nome.trim(),
        imagem,
        categoria_id: categoriaId,
        turma_id: turmaId,
      })

      if (error) throw error

      router.replace({
        pathname:
          "/professor/Home/cartoes/manageCategory/categoryInfo/[categoriaId]",
        params: {
          categoriaId,
          turmaId,
          nomeCategoria,
        },
      })
    } catch (e) {
      console.log("Erro ao criar subcategoria:", e)
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  function irPesquisarImagem() {
    router.push({
      pathname: "/professor/Home/cartoes/searchPic/[turmaId]",
      params: {
        turmaId,
        professor: "professor",
        destino: "subcategoria",
        categoriaId,
        nomeCategoria,
      },
    })
  }

  function irSelecionarGaleria() {
    router.push({
      pathname: "/professor/Home/cartoes/selectGallery/[turmaId]",
      params: {
        turmaId,
        destino: "subcategoria",
        categoriaId,
        nomeCategoria,
      },
    })
  }

  return {
    nomeCategoria,
    nome,
    imagem,
    loading,
    setNome,
    setImagem,
    criarSubcategoria,
    voltar,
    irPesquisarImagem,
    irSelecionarGaleria,
  }
}