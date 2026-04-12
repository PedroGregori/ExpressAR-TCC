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
  const { alunoId, nome } = useLocalSearchParams<{ alunoId: string; nome: string }>()

  const [aluno, setAluno] = useState<Aluno | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (alunoId) loadData()
  }, [alunoId])

  async function loadData() {
    try {
      const { data } = await supabase
        .from("alunos")
        .select("id, nome, idade, sexo, codigo")
        .eq("id", alunoId)   // ✅ agora busca pelo id
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
    if (aluno) router.push(`/professor/Home/alunos/relatorio?codigo=${aluno.codigo}&nome=${nome}`)
  }

  function editarAluno() {
    if (aluno) router.push(`/professor/Home/alunos/editar?codigo=${aluno.codigo}&nome=${nome}`)
  }

  async function removerAluno() {
    if (!aluno) return
    try {
      await supabase.from("alunos").delete().eq("id", aluno.id)
      router.back()
    } catch (e) {
      console.log("Erro ao remover aluno:", e)
    }
  }

  return {
    nome,
    aluno,
    loading,
    handleLogout,
    verRelatorio,
    editarAluno,
    removerAluno,
  }
}
