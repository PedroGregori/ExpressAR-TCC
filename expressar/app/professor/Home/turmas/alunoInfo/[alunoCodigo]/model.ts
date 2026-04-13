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
  const { alunoCodigo, nome } = useLocalSearchParams<{ alunoCodigo: string; nome: string }>()

  console.log(alunoCodigo)

  const [aluno, setAluno] = useState<Aluno | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (alunoCodigo) loadData()
  }, [alunoCodigo])

  async function loadData() {
    try {
      const { data } = await supabase
        .from("alunos")
        .select("id, nome, idade, sexo, codigo")
        .eq("codigo", alunoCodigo)   // ✅ agora busca pelo id
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
      await supabase.from("alunos").delete().eq("codigo", aluno.codigo)
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
