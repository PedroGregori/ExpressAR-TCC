import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { buscarPictogramas } from "@/services/arasaac/arasaacService"

type Pictograma = {
  _id: number
}

export default function usePesquisarImagemModel() {
  const router = useRouter()
  const { turmaId, professor } = useLocalSearchParams<{
    turmaId: string
    professor: string
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

    router.replace({
      pathname: `/professor/Home/cartoes/createCard/${turmaId}`,
      params: {
        professor,
        imagem: url,
      },
    })
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