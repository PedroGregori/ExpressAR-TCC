import { useEffect, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { supabase } from "@/lib/supabase"

type Aluno = {
  id: string
  nome: string
  idade: number
  sexo: string
  codigo: string
}

export default function useAlunoModel() {
  const router = useRouter()
  const { alunoCodigo, nome } = useLocalSearchParams<{
    alunoCodigo: string
    nome: string
  }>()

  const [aluno, setAluno] = useState<Aluno | null>(null)
  const [loading, setLoading] = useState(true)
  const [popupRemover, setPopupRemover] = useState(false)
  const [removendo, setRemovendo] = useState(false)

  useEffect(() => {
    if (alunoCodigo) loadData()
  }, [alunoCodigo])

  async function loadData() {
    try {
      const { data } = await supabase
        .from("alunos")
        .select("id, nome, idade, sexo, codigo")
        .eq("codigo", alunoCodigo)
        .single()

      if (data) setAluno(data as Aluno)
    } catch (e) {
      console.log("Erro ao carregar aluno:", e)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    supabase.auth.signOut()
    router.replace("/")
  }

  function verRelatorio() {
    if (aluno) {
      router.push(
        `/professor/Home/alunos/relatorio?codigo=${aluno.codigo}&nome=${nome}`
      )
    }
  }

  function editarAluno() {
    if (aluno) {
      router.push(
        `/professor/Home/turmas/alunoInfo/${aluno.codigo}/editAluno?nome=${nome}`
      )
    }
  }

  function voltar() {
    router.back()
  }

  function abrirPopupRemover() {
    setPopupRemover(true)
  }

  function fecharPopupRemover() {
    setPopupRemover(false)
  }

  async function confirmarRemocao() {
    if (!aluno) return

    try {
      setRemovendo(true)

      await supabase
        .from("alunos")
        .delete()
        .eq("codigo", aluno.codigo)

      setPopupRemover(false)
      router.back()
    } catch (e) {
      console.log("Erro ao remover aluno:", e)
    } finally {
      setRemovendo(false)
    }
  }

  return {
    nome,
    aluno,
    loading,
    popupRemover,
    removendo,
    handleLogout,
    verRelatorio,
    editarAluno,
    abrirPopupRemover,
    fecharPopupRemover,
    confirmarRemocao,
    voltar,
  }
}