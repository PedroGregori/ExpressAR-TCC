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

      // 🔥 busca turmas
      const { data: turmasData, error } = await supabase
        .from("turmas")
        .select("id, nome, turno")

      if (error) throw error

      // 🔥 conta alunos igual você já fez no outro model
      const turmasComQtd = await Promise.all(
        (turmasData || []).map(async (turma) => {
          const { count } = await supabase
            .from("alunos")
            .select("*", { count: "exact", head: true })
            .eq("turma_id", turma.id)

          return {
            ...turma,
            alunos: count ?? 0,
          }
        })
      )

      setTurmas(turmasComQtd)

    } catch (e) {
      console.log("Erro ao buscar turmas:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarTurmas()
  }, [])

  function selecionarTurma(id: string) {
    router.push(`/professor/Home/cartoes/createCard/${id}`)
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