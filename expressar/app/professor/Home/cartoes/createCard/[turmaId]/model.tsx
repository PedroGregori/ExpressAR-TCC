import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useLocalSearchParams } from "expo-router"

export default function useCriarCartaoModel() {
  const router = useRouter()

  const {
    turmaId,
    professor,
    imagem: imagemParam,
  } = useLocalSearchParams<{
    turmaId: string
    professor: string
    imagem?: string
  }>()

  const [nome, setNome] = useState("")
  const [imagem, setImagem] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState<{ id: string; nome: string } | null>(null)

  const [nomeProfessor] = useState(professor)

  useEffect(() => {
    if (imagemParam) {
      setImagem(imagemParam)
    }
  }, [imagemParam])

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
          nome,
          imagem,
          turma_id: turmaId,
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
  }

  function irPesquisarImagem() {
    router.push({
      pathname: "/professor/Home/cartoes/searchPic/[turmaId]",
      params: {
        turmaId,
        professor,
        destino: "cartao",
      },
    })
  }

  function irSelecionarGaleria() {
    router.push({
      pathname: "/professor/Home/turmas/selecionarGaleria/[turmaId]",
      params: {
        turmaId,
        professor,
        destino: "cartao",
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