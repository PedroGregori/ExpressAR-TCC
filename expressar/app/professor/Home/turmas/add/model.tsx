import { useState } from "react"
import { useRouter } from "expo-router"
import { supabase } from "@/lib/supabase"

export default function useAddTurmaModel() {
  const router = useRouter()

  const [nomeTurma, setNomeTurma] = useState("")
  const [turno, setTurno] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function copiarCategoriasBaseParaTurma(turmaId: string) {
    const { data: categoriasBase, error: erroCategorias } = await supabase
      .from("categorias_base")
      .select("id, nome, imagem, tem_subcategoria")

    if (erroCategorias) throw erroCategorias

    for (const categoriaBase of categoriasBase || []) {
      const { data: categoriaCriada, error: erroCategoriaCriada } = await supabase
        .from("categorias")
        .insert({
          nome: categoriaBase.nome,
          imagem: categoriaBase.imagem,
          turma_id: turmaId,
          tem_subcategoria: categoriaBase.tem_subcategoria,
          categoria_base_id: categoriaBase.id,
        })
        .select("id")
        .single()

      if (erroCategoriaCriada) throw erroCategoriaCriada

      if (categoriaBase.tem_subcategoria) {
        const { data: subcategoriasBase, error: erroSubs } = await supabase
          .from("subcategorias_base")
          .select("id, nome, imagem")
          .eq("categoria_base_id", categoriaBase.id)

        if (erroSubs) throw erroSubs

        if (subcategoriasBase && subcategoriasBase.length > 0) {
          const subcategoriasParaInserir = subcategoriasBase.map((sub) => ({
            nome: sub.nome,
            imagem: sub.imagem,
            categoria_id: categoriaCriada.id,
            turma_id: turmaId,
            subcategoria_base_id: sub.id,
          }))

          const { error: erroInsertSubs } = await supabase
            .from("subcategorias")
            .insert(subcategoriasParaInserir)

          if (erroInsertSubs) throw erroInsertSubs
        }
      }
    }
  }

  async function handleCreateTurma() {
    try {
      setError("")

      if (!nomeTurma.trim()) {
        setError("O nome da turma é obrigatório.")
        return
      }

      if (!turno) {
        setError("Selecione um turno válido.")
        return
      }

      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace("/")
        return
      }

      const { data: turmaCriada, error: insertError } = await supabase
        .from("turmas")
        .insert({
          nome: nomeTurma.trim(),
          turno,
          professor_id: user.id,
        })
        .select("id")
        .single()

      if (insertError) throw insertError

      await copiarCategoriasBaseParaTurma(turmaCriada.id)

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
    error,
    handleCreateTurma,
    handleCancel,
  }
}