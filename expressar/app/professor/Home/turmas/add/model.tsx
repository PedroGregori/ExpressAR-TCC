import { useState } from "react"
import { useRouter } from "expo-router"
import { supabase } from "@/lib/supabase"

export default function useAddTurmaModel() {
  const router = useRouter()

  const [nomeTurma, setNomeTurma] = useState("")
  const [turno, setTurno] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("") // 🔥 estado para mensagens de erro

  async function handleCreateTurma() {
    try {
      setError("") // limpa erro anterior

      // 🔥 validações
      if (!nomeTurma.trim()) {
        setError("O nome da turma é obrigatório.")
        return
      }
      if (!turno) {
        setError("Selecione um turno válido.")
        return
      }

      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace("/")
        return
      }

      const { error: insertError } = await supabase
        .from("turmas")
        .insert({
          nome: nomeTurma,
          turno,
          professor_id: user.id,
        })

      if (insertError) throw insertError

      router.replace("professor/Home/turmas")
    } catch (e) {
      console.log("Erro ao criar turma:", e)
      setError("Não foi possível criar a turma.")
    } finally {
      setLoading(false)
    }
  }

  function handleCancel() {
    router.back()
  }

  return {
    nomeTurma,
    setNomeTurma,
    turno,
    setTurno,
    loading,
    error, // 🔥 expõe o erro para a View
    handleCreateTurma,
    handleCancel,
  }
}
