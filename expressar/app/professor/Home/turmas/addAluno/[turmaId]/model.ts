import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useLocalSearchParams } from "expo-router"

export default function useAddAlunoModel() {
  const router = useRouter()
  const { turmaId, professor } = useLocalSearchParams<{
    turmaId: string
    professor: string
  }>()

  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [sexo, setSexo] = useState("")
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")
  const [popup, setPopup] = useState<{ codigo: string; nome: string } | null>(null)

  const [nomeProfessor] = useState(professor)

  function handleLogout() {
    supabase.auth.signOut()
    router.replace("/login")
  }

  async function salvarAluno() {
    const nomeLimpo = nome.trim()
    const idadeNumero = Number(idade)

    if (!nomeLimpo) {
      setErro("Digite o nome do aluno.")
      return
    }

    if (!idade.trim()) {
      setErro("Digite a idade do aluno.")
      return
    }

    if (Number.isNaN(idadeNumero) || idadeNumero <= 0) {
      setErro("Digite uma idade válida.")
      return
    }

    if (!sexo.trim()) {
      setErro("Selecione o gênero do aluno.")
      return
    }

    try {
      setErro("")
      setLoading(true)

      let sucesso = false
      let codigo = ""
      let novoAluno: any = null

      while (!sucesso) {
        codigo = "ALU-" + Math.floor(1000 + Math.random() * 9000).toString()

        const { data, error } = await supabase
          .from("alunos")
          .insert({
            nome: nomeLimpo,
            idade: idadeNumero,
            sexo,
            turma_id: turmaId,
            codigo,
          })
          .select("id, nome, codigo")

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
      setErro("Não foi possível adicionar o aluno.")
    } finally {
      setLoading(false)
    }
  }

  function fecharPopup() {
    setPopup(null)
  }

  function verAluno() {
    if (popup) router.push(`/professor/Home/turmas/alunoInfo/${popup.codigo}/`)
    fecharPopup()
  }

  function voltar() {
    router.back()
  }

  function adicionarOutro() {
    setNome("")
    setIdade("")
    setSexo("")
    setErro("")
    setPopup(null)
  }

  return {
    nome,
    idade,
    sexo,
    loading,
    erro,
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
    voltar,
  }
}