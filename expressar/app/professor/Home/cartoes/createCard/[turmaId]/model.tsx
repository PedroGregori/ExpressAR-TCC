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

  // 🔥 RECEBE IMAGEM DA OUTRA TELA
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

  function fecharPopup() {
    setPopup(null)
  }

  function adicionarOutro() {
    setNome("")
    setImagem(null)
    setPopup(null)
  }

  // 🔥 IR PRA BUSCA (CORRIGIDO)
  function irPesquisarImagem() {
    router.push(
      `/professor/Home/cartoes/searchPic/${turmaId}?professor=${professor}`
    )
  }

  function irSelecionarGaleria() {
    router.push(
      `/professor/Home/turmas/selecionarGaleria/${turmaId}?professor=${professor}`
    )
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
  }
}