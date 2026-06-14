import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { supabase } from "@/lib/supabase"

type Turma = {
  id: string
  nome: string
  turno: string | null
  total_alunos: number
}

export default function useRelatorioModel() {
  const router = useRouter()

  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    buscarTurmas()
  }, [])

  async function buscarTurmas() {
    try {
      setLoading(true)

      const { data: userData } = await supabase.auth.getUser()
      const professorId = userData.user?.id

      if (!professorId) return

      const { data, error } = await supabase
        .from("turmas")
        .select(`
          id,
          nome,
          turno,
          alunos(id)
        `)
        .eq("professor_id", professorId)
        .order("criado_em", { ascending: true })

      if (error) throw error

      const turmasFormatadas =
        data?.map((turma: any) => ({
          id: turma.id,
          nome: turma.nome,
          turno: turma.turno,
          total_alunos: turma.alunos?.length ?? 0,
        })) ?? []

      setTurmas(turmasFormatadas)
    } catch (e) {
      console.log("Erro ao buscar turmas do relatório:", e)
      setTurmas([])
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  function irParaTurma(turma: Turma) {
    router.push({
      pathname: "/professor/Home/relatorios/turma/[turmaId]",
      params: {
        turmaId: turma.id,
        nomeTurma: turma.nome,
      },
    })
  }

  return {
    turmas,
    loading,
    voltar,
    irParaTurma,
  }
}