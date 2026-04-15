import { create } from "zustand"

type CardImageStore = {
  imagemSelecionada: string | null
  setImagemSelecionada: (imagem: string | null) => void
}

export const useCardImageStore = create<CardImageStore>((set) => ({
  imagemSelecionada: null,
  setImagemSelecionada: (imagem) => set({ imagemSelecionada: imagem }),
}))