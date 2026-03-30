import { useState, useEffect } from 'react'
import { buscarPictogramas } from '@/services/arasaac/arasaacService'

const IMAGE_URL = 'https://static.arasaac.org/pictograms'

type Pictograma = {
  id: string
  nome: string
  imagemUrl: string
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

        const dados = await buscarPictogramas(palavraChave)

        const formatado: Pictograma[] = dados
          .slice(0, 20)
          .map((item: any) => ({
            id: item._id,
            nome: item.keywords[0]?.keyword ?? palavraChave,
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