import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { supabase } from "@/lib/supabase"

export default function useHomeScreenModel() {
  const router = useRouter()

  const [nome, setNome] = useState("Nome")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfessor()
  }, [])

  async function loadProfessor() {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/')
        return
      }

      const { data, error } = await supabase
        .from('professores')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      setNome(data.nome)
    } catch (e) {
      console.log("Erro:", e)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    supabase.auth.signOut()
    router.replace('/')
  }

  function goTurmas() {
    router.push(`professor/Home/turmas?nome=${nome}`)
  }

  function goCartoes() {
    router.push('/cartoes')
  }

  function goRelatorio() {
    router.push('/relatorio')
  }

  return {
    nome,
    loading,
    handleLogout,
    goTurmas,
    goCartoes,
    goRelatorio,
  }
}