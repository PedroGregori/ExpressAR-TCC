import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useLocalSearchParams } from "expo-router"
import { useCardImageStore } from "@/store/useCardImageStore"

export default function useCriarCartaoModel() {
  const router = useRouter()

  const {
    turmaId,
    professor,
    categoriaId,
    subcategoriaId,
    imagem: imagemParam,
    nome: nomeParam,
    destino,
  } = useLocalSearchParams<{
    turmaId: string
    professor?: string
    categoriaId?: string
    subcategoriaId?: string
    imagem?: string
    nome?: string
    destino?: "cartao" | "subcategoria"
  }>()

  const destinoAtual = destino ?? (subcategoriaId ? "subcategoria" : "cartao")

  const imagemSelecionada = useCardImageStore(
    (state) => state.imagemSelecionada
  )
  const setImagemSelecionada = useCardImageStore(
    (state) => state.setImagemSelecionada
  )

  const [nome, setNome] = useState(nomeParam ?? "")
  const [imagem, setImagem] = useState<string | null>(imagemParam ?? null)
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState<{ id: string; nome: string } | null>(null)

  const [nomeProfessor] = useState(professor)

  useEffect(() => {
  console.log("DEBUG PARAMS:", {
    turmaId,
    categoriaId,
    subcategoriaId,
  })
}, [])

  useEffect(() => {
    if (typeof imagemParam === "string" && imagemParam.trim() !== "") {
      setImagem(imagemParam)
    }
  }, [imagemParam])

  useEffect(() => {
    if (typeof nomeParam === "string") {
      setNome(nomeParam)
    }
  }, [nomeParam])

  useEffect(() => {
    if (imagemSelecionada) {
      setImagem(imagemSelecionada)
      setImagemSelecionada(null)
    }
  }, [imagemSelecionada, setImagemSelecionada])

  function handleLogout() {
    supabase.auth.signOut()
    router.replace("/login")
  }

  async function salvarCartao() {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("cartoes")
        .insert({
          nome: nome.trim(),
          imagem,
          turma_id: turmaId,
          categoria_id: categoriaId ?? null,
          subcategoria_id: subcategoriaId ?? null,
        })
        .select("id, nome")
        .single()

      if (error) throw error

      if (data) {
        setPopup({
          id: data.id,
          nome: data.nome,
        })
      }
    } catch (e) {
      console.log("Erro ao salvar cartão:", e)
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  function fecharPopup() {
    setPopup(null)
  }

  function adicionarOutro() {
    setNome("")
    setImagem(null)
    setPopup(null)
    setImagemSelecionada(null)
  }

  function irPesquisarImagem() {
    router.push({
      pathname: "/professor/Home/cartoes/searchPic/[turmaId]",
      params: {
        turmaId,
        professor,
        destino: destinoAtual,
        categoriaId,
        subcategoriaId,
        nome,
      },
    })
  }

  function irSelecionarGaleria() {
    router.push({
      pathname: "/professor/Home/turmas/selecionarGaleria/[turmaId]",
      params: {
        turmaId,
        professor,
        destino: destinoAtual,
        categoriaId,
        subcategoriaId,
        nome,
        },
      })
  }

  return {
    nome,
    imagem,
    loading,
    popup,
    setNome,
    setImagem,
    salvarCartao,
    fecharPopup,
    adicionarOutro,
    nomeProfessor,
    handleLogout,
    irPesquisarImagem,
    irSelecionarGaleria,
    voltar,
  }
}