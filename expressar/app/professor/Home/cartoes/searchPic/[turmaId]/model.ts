import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { buscarPictogramas } from "@/services/arasaac/arasaacService"

type Pictograma = {
  _id: number
}

type Destino = "cartao" | "categoria" | "subcategoria"

export default function usePesquisarImagemModel() {
  const router = useRouter()

  const {
    turmaId,
    professor,
    destino,
    nomeTurma,
    categoriaId,
  } = useLocalSearchParams<{
    turmaId: string
    professor?: string
    destino: Destino
    nomeTurma?: string
    categoriaId?: string
  }>()

  const [busca, setBusca] = useState("")
  const [resultados, setResultados] = useState<Pictograma[]>([])
  const [loading, setLoading] = useState(false)

  async function buscar() {
    if (!busca.trim()) return

    try {
      setLoading(true)
      const data = await buscarPictogramas(busca)
      setResultados(data)
    } catch (e) {
      console.log("Erro ao buscar pictogramas:", e)
    } finally {
      setLoading(false)
    }
  }

  function selecionarImagem(id: number) {
    const url = `https://static.arasaac.org/pictograms/${id}/${id}_500.png`

    if (destino === "cartao") {
      router.replace({
        pathname: `/professor/Home/cartoes/createCard/${turmaId}`,
        params: {
          professor,
          imagem: url,
        },
      })
      return
    }

    if (destino === "categoria") {
      router.replace({
        pathname: "/professor/Home/cartoes/manageCategory/createCategory/[turmaId]",
        params: {
          turmaId,
          nomeTurma,
          imagem: url,
        },
      })
      return
    }

    if (destino === "subcategoria") {
      router.replace({
        pathname: "/professor/Home/cartoes/createSubCategory",
        params: {
          turmaId,
          nomeTurma,
          categoriaId,
          imagem: url,
        },
      })
      return
    }
  }

  function voltar() {
    router.back()
  }

  return {
    busca,
    resultados,
    loading,
    setBusca,
    buscar,
    selecionarImagem,
    voltar,
  }
}