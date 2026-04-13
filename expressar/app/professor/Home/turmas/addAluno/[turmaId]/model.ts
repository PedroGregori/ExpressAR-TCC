  import { useState } from "react"
  import { supabase } from "@/lib/supabase"
  import { useRouter, useLocalSearchParams } from "expo-router"

  export default function useAddAlunoModel() {
    const router = useRouter()
    const { turmaId, professor } = useLocalSearchParams<{ turmaId: string; professor: string }>()

    const [nome, setNome] = useState("")
    const [idade, setIdade] = useState("")
    const [sexo, setSexo] = useState("")
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState<{ codigo: string; nome: string } | null>(null)

    const [nomeProfessor] = useState(professor)

    function handleLogout() {
      supabase.auth.signOut()
      router.replace("/login")
    }

    async function salvarAluno() {
      try {
        setLoading(true)
        let sucesso = false
        let codigo = ""
        let novoAluno: any = null

        while (!sucesso) {
          codigo = "ALU-" + Math.floor(1000 + Math.random() * 9000).toString()

          const { data, error } = await supabase
            .from("alunos")
            .insert({
              nome,
              idade: Number(idade),
              sexo,
              turma_id: turmaId,
              codigo,
            })
            .select("id, nome, codigo") // ✅ já retorna o id e o código

          if (!error && data && data.length > 0) {
            sucesso = true
            novoAluno = data[0]
            setPopup({ codigo: novoAluno.codigo, nome: novoAluno.nome })
          } else if (error?.code === "23505") {
            console.log("Código duplicado, tentando novamente...")
          } else {
            throw error
          }
        }
      } catch (e) {
        console.log("Erro ao adicionar aluno:", e)
      } finally {
        setLoading(false)
      }
    }


    function fecharPopup() {
      setPopup(null)
    }

    function verAluno() {
      if (popup) router.push(`/professor/Home/turmas/alunoInfo/${popup.codigo}/`)
    }

    function adicionarOutro() {
      setNome("")
      setIdade("")
      setSexo("")
      setPopup(null)
    }

    return {
      nome,
      idade,
      sexo,
      loading,
      popup,
      setNome,
      setIdade,
      setSexo,
      salvarAluno,
      fecharPopup,
      verAluno,
      adicionarOutro,
      nomeProfessor,
      handleLogout,
    }
  }
