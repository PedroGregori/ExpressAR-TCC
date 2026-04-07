import { useState, useEffect } from 'react'
import { buscarPictogramas } from '@/services/arasaac/arasaacService'
import { filtrarPorCategoria } from '@/utilis/filters'

const IMAGE_URL = 'https://static.arasaac.org/pictograms'

type Pictograma = {
  id: string
  nome: string
  imagemUrl: string
}

// 🔥 REMOVE DUPLICADOS POR NOME
function removerDuplicadosPorNome(lista: any[]) {
  const mapa = new Map<string, any>()

  lista.forEach((item) => {
    const nome = item.keywords?.[0]?.keyword?.toLowerCase()

    if (!nome) return

    // só adiciona se ainda não existir
    if (!mapa.has(nome)) {
      mapa.set(nome, item)
    }
  })

  return Array.from(mapa.values())
}

export function usePictogramas(palavraChave: string) {
  const [pictogramas, setPictogramas] = useState<Pictograma[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true)
        setErro('')

        const categoria = palavraChave.toLowerCase()

        const dados = await buscarPictogramas(categoria)

        // 🔥 1. FILTRO DINÂMICO
        const filtrado = filtrarPorCategoria(dados, categoria)

        // 🔥 2. REMOVE DUPLICADOS
        const unicos = removerDuplicadosPorNome(filtrado)

        // 🔥 3. FORMATA PRA UI
        const formatado: Pictograma[] = unicos
          .slice(0, 20)
          .map((item: any) => ({
            id: String(item._id),
            nome: item.keywords?.[0]?.keyword ?? categoria,
            imagemUrl: `${IMAGE_URL}/${item._id}/${item._id}_500.png`,
          }))

        console.log('FORMATADO:', formatado)

        setPictogramas(formatado)
      } catch (e) {
        setErro('Erro ao carregar pictogramas.')
      } finally {
        setCarregando(false)
      }
    }

    if (palavraChave) {
      carregar()
    }
  }, [palavraChave])

  return { pictogramas, carregando, erro }
}