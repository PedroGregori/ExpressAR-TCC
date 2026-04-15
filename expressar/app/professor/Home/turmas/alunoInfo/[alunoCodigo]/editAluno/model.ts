import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, useLocalSearchParams } from "expo-router"

export default function useEditAlunoModel() {
  const router = useRouter()
  const { alunoCodigo } = useLocalSearchParams<{ alunoCodigo : string }>()

  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [sexo, setSexo] = useState("")
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState("")
  const [popup, setPopup] = useState<{ alunoCodigo: string; nome: string } | null>(null)

  useEffect(() => {
    if (alunoCodigo) {
      carregarAluno()
    }
  }, [alunoCodigo])

  async function carregarAluno() {
    try {
      setLoading(true)
      setErro("")

      const { data, error } = await supabase
        .from("alunos")
        .select("nome, idade, sexo, codigo")
        .eq("codigo", alunoCodigo)
        .maybeSingle()

      if (error) throw error

      if (!data) {
        setErro("Aluno não encontrado.")
        return
      }

      setNome(data.nome ?? "")
      setIdade(String(data.idade ?? ""))
      setSexo(data.sexo ?? "")
    } catch (e) {
      console.log("Erro ao carregar aluno:", e)
      setErro("Não foi possível carregar os dados do aluno.")
    } finally {
      setLoading(false)
    }
  }

  async function salvarEdicao() {
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
      setSalvando(true)

      const { error } = await supabase
        .from("alunos")
        .update({
          nome: nomeLimpo,
          idade: idadeNumero,
          sexo,
        })
        .eq("codigo", alunoCodigo)

      if (error) throw error

      setPopup({
        alunoCodigo: String(alunoCodigo),
        nome: nomeLimpo,
      })
    } catch (e) {
      console.log("Erro ao editar aluno:", e)
      setErro("Não foi possível salvar as alterações.")
    } finally {
      setSalvando(false)
    }
  }

  function fecharPopup() {
    setPopup(null)
  }

  function verAluno() {
    router.replace(`/professor/Home/turmas/alunoInfo/${alunoCodigo}?nome=${alunoCodigo}`)
  }

  function voltar() {
    router.back()
  }

  return {
    nome,
    idade,
    sexo,
    alunoCodigo,
    loading,
    salvando,
    erro,
    popup,
    setNome,
    setIdade,
    setSexo,
    salvarEdicao,
    fecharPopup,
    verAluno,
    voltar,
  }
}