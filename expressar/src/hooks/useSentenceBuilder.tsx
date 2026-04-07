import { createContext, useContext, useState } from 'react'

type Pictograma = {
  id: string
  nome: string
  imagemUrl: string
  uid: string // 🔥 agora é obrigatório
}

type SentenceContextType = {
  frase: Pictograma[]
  adicionar: (p: Omit<Pictograma, 'uid'>) => void
  remover: (uid: string) => void
  limpar: () => void
}

const SentenceContext = createContext<SentenceContextType | null>(null)

export function SentenceProvider({ children }: any) {
  const [frase, setFrase] = useState<Pictograma[]>([])

  function adicionar(pictograma: Omit<Pictograma, 'uid'>) {
    setFrase((prev) => [
      ...prev,
      {
        ...pictograma,
        uid: Date.now().toString() + Math.random(), // 🔥 ID único garantido
      },
    ])
  }

  function remover(uid: string) {
    setFrase((prev) => prev.filter((p) => p.uid !== uid))
  }

  function limpar() {
    setFrase([])
  }

  return (
    <SentenceContext.Provider value={{ frase, adicionar, remover, limpar }}>
      {children}
    </SentenceContext.Provider>
  )
}

export function useSentenceBuilder() {
  const context = useContext(SentenceContext)

  if (!context) {
    throw new Error('useSentenceBuilder precisa estar dentro do Provider')
  }

  return context
}