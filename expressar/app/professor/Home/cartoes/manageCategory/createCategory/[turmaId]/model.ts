import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useLocalSearchParams, useRouter } from "expo-router"

export default function useCriarCategoriaModel() {
  const router = useRouter()

  const {
    turmaId,
    nomeTurma,
    imagem: imagemParam,
  } = useLocalSearchParams<{
    turmaId: string
    nomeTurma: string
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

  async function criarCategoria() {
    try {
      if (!nome.trim()) return

      setLoading(true)

      const { error } = await supabase.from("categorias").insert({
        nome: nome.trim(),
        imagem,
        turma_id: turmaId,
      })

      if (error) throw error

      router.replace({
        pathname: "/professor/Home/cartoes/manageCategory/",
        params: {
          turmaId,
          nomeTurma,
        },
      })
    } catch (e) {
      console.log("Erro ao criar categoria:", e)
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
        destino: "categoria",
        nomeTurma,
      },
    })
  }

  function irSelecionarGaleria() {
    router.push({
      pathname: "/professor/Home/cartoes/selectGallery/[turmaId]",
      params: {
        turmaId,
        nomeTurma,
        destino: "categoria",
      },
    })
  }

  return {
    nomeTurma,
    nome,
    imagem,
    loading,
    setNome,
    setImagem,
    criarCategoria,
    voltar,
    irPesquisarImagem,
    irSelecionarGaleria,
  }
}