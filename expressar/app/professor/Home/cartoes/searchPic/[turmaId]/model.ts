import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { buscarPictogramas } from "@/services/arasaac/arasaacService"
import { useCardImageStore } from "@/store/useCardImageStore"

type Pictograma = {
  _id: number
}

type Destino = "cartao" | "categoria" | "subcategoria"

export default function usePesquisarImagemModel() {
  const router = useRouter()
  const setImagemSelecionada = useCardImageStore(
    (state) => state.setImagemSelecionada
  )

  const {
    turmaId,
    professor,
    destino,
    nomeTurma,
    categoriaId,
    subcategoriaId,
    nome,
  } = useLocalSearchParams<{
    turmaId: string
    professor?: string
    destino: Destino
    nomeTurma?: string
    categoriaId?: string
    subcategoriaId?: string
    nome?: string
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
      setImagemSelecionada(url)
      router.back()
      return
    }

    if (destino === "categoria") {
      router.replace({
        pathname: "/professor/Home/cartoes/manageCategory/createCategory/[turmaId]",
        params: {
          turmaId,
          nomeTurma,
          professor,
          imagem: url,
        },
      })
      return
    }

    if (destino === "subcategoria") {
      setImagemSelecionada(url)
      router.back()
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