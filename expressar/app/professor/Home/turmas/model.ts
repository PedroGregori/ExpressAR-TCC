import { useEffect, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { supabase } from "@/lib/supabase"

type Turma = {
  id: string
  nome: string
  turno: string
  qtd_alunos: number
  created_at?: string
}

export default function useTurmasModel() {
  const router = useRouter()
  const { nome } = useLocalSearchParams<{ nome: string }>()

  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace("/")
        return
      }

      const { data: turmasData, error } = await supabase
        .from("turmas")
        .select("id, nome, turno")
        .eq("professor_id", user.id)

      if (error) throw error

      const turmasComQtd = await Promise.all(
        (turmasData || []).map(async (turma) => {
          const { count } = await supabase
            .from("alunos")
            .select("*", { count: "exact", head: true })
            .eq("turma_id", turma.id)

          return {
            ...turma,
            qtd_alunos: count ?? 0,
          }
        })
      )

      setTurmas(turmasComQtd)
    } catch (e) {
      console.log("Erro:", e)
    } finally {
      setLoading(false)
    }
  }

  function goAdicionarTurma() {
    router.push(`/professor/Home/turmas/add?nome=${nome}`)
  }

  function goDetalharTurma(turmaId: string) {
    router.push(`/professor/Home/turmas/info/${turmaId}?professor=${nome}`)
  }

  function voltar() {
    router.back()
  }

  function handleLogout() {
    supabase.auth.signOut()
    router.replace("/")
  }

  return {
    nome,
    turmas,
    loading,
    goAdicionarTurma,
    goDetalharTurma,
    voltar,
    handleLogout,
  }
}