import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "expo-router"

type Turma = {
  id: string
  nome: string
  turno: string
  alunos: number
}

export default function useSelecionarTurmaModel() {
  const router = useRouter()

  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loading, setLoading] = useState(false)

  async function buscarTurmas() {
    try {
      setLoading(true)
      setTurmas([])

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) throw userError
      if (!user) throw new Error("Usuário não autenticado")

      const { data: turmasData, error } = await supabase
        .from("turmas")
        .select("id, nome, turno")
        .eq("professor_id", user.id)

      if (error) throw error

      const turmasComQtd = await Promise.all(
        (turmasData || []).map(async (turma) => {
          const { count, error: countError } = await supabase
            .from("alunos")
            .select("*", { count: "exact", head: true })
            .eq("turma_id", turma.id)

          if (countError) throw countError

          return {
            ...turma,
            alunos: count ?? 0,
          }
        })
      )

      setTurmas(turmasComQtd)
    } catch (e) {
      console.log("Erro ao buscar turmas:", e)
      setTurmas([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarTurmas()
  }, [])

  function selecionarTurma(id: string, nome: string) {
    router.push({
      pathname: "/professor/Home/cartoes/manageCategory",
      params: {
        turmaId: id,
        nomeTurma: nome,
      },
    })
  }

  function voltar() {
    router.back()
  }

  return {
    turmas,
    loading,
    selecionarTurma,
    voltar,
  }
}