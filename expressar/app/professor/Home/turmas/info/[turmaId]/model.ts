import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useLocalSearchParams } from "expo-router"

export default function useInfoModel() {
  const router = useRouter()
  const { turmaId, professor } = useLocalSearchParams<{ turmaId: string; professor: string }>()

  const [turmaNome, setTurmaNome] = useState("")
  const [alunos, setAlunos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (turmaId) loadData()
  }, [turmaId])

  async function loadData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace("/")
        return
      }

      const { data: turma } = await supabase
        .from("turmas")
        .select("nome")
        .eq("id", turmaId)
        .single()
      if (turma) setTurmaNome(turma.nome)

      const { data: alunosData } = await supabase
        .from("alunos")
        .select("id, nome, idade, sexo")
        .eq("turma_id", turmaId)

      setAlunos(alunosData || [])
    } catch (e) {
      console.log("Erro:", e)
    } finally {
      setLoading(false)
    }
  }

  // ✅ logout funcionando
  function handleLogout() {
    supabase.auth.signOut()
    router.replace("/")
  }

  function goAdicionarAluno() {
    router.push(`/professor/Home/turmas/addAluno/${turmaId}?professor=${professor}`)
  }

  return {
    nomeProfessor: professor,
    turmaNome,
    alunos,
    loading,
    handleLogout,
    goAdicionarAluno,
  }
}
