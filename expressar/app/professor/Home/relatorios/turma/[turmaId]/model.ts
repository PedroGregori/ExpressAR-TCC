import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { supabase } from "@/lib/supabase"

type Aluno = {
  id: string
  nome: string
  idade: number
  sexo: string
}

export default function useRelatorioTurmaModel() {
  const router = useRouter()

  const { turmaId, nomeTurma } = useLocalSearchParams<{
    turmaId: string
    nomeTurma: string
  }>()

  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (turmaId) {
      buscarAlunos()
    }
  }, [turmaId])

  async function buscarAlunos() {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("alunos")
        .select("id, nome, idade, sexo")
        .eq("turma_id", turmaId)
        .order("nome", { ascending: true })

      if (error) throw error

      setAlunos(data || [])
    } catch (e) {
      console.log("Erro ao buscar alunos:", e)
      setAlunos([])
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  function irParaRelatorioAluno(aluno: Aluno) {
    router.push({
      pathname: "/professor/Home/relatorios/aluno/[alunoId]",
      params: {
        alunoId: aluno.id,
        turmaId,
        nomeAluno: aluno.nome,
        idade: String(aluno.idade),
        sexo: aluno.sexo,
      },
    })
  }

  return {
    nomeTurma,
    alunos,
    loading,
    voltar,
    irParaRelatorioAluno,
  }
}