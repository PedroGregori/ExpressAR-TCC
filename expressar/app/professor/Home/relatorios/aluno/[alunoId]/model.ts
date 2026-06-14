import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { supabase } from "@/lib/supabase"

type CategoriaResumo = {
  id: string
  nome: string
  total: number
}

type CartaoResumo = {
  id: string
  nome: string
  imagem: string | null
  total: number
}

type Interacao = {
  id: string
  criado_em: string
  cartao_id: string
  categoria_id: string
  cartoes: {
    id: string
    nome: string
    imagem: string | null
  } | null
  categorias: {
    id: string
    nome: string
  } | null
}

export default function useRelatorioAlunoModel() {
  const router = useRouter()

  const { alunoId, turmaId, nomeAluno, idade, sexo } =
    useLocalSearchParams<{
      alunoId: string
      turmaId: string
      nomeAluno: string
      idade: string
      sexo: string
    }>()

  const [loading, setLoading] = useState(false)
  const [totalInteracoes, setTotalInteracoes] = useState(0)
  const [diasAtivos, setDiasAtivos] = useState(0)
  const [categoriaMaisUsada, setCategoriaMaisUsada] =
    useState<CategoriaResumo | null>(null)
  const [categoriasRanking, setCategoriasRanking] = useState<CategoriaResumo[]>([])
  const [cartoesRanking, setCartoesRanking] = useState<CartaoResumo[]>([])

  useEffect(() => {
    if (alunoId) {
      buscarRelatorio()
    }
  }, [alunoId])

  async function buscarRelatorio() {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("interacoes_cartoes")
        .select(`
          id,
          criado_em,
          cartao_id,
          categoria_id,
          cartoes (
            id,
            nome,
            imagem
          ),
          categorias (
            id,
            nome
          )
        `)
        .eq("aluno_id", alunoId)
        .eq("turma_id", turmaId)
        .order("criado_em", { ascending: false })

      if (error) throw error

      const interacoes = (data || []) as unknown as Interacao[]

      setTotalInteracoes(interacoes.length)

      const diasUnicos = new Set(
        interacoes.map((item) => item.criado_em.slice(0, 10))
      )

      setDiasAtivos(diasUnicos.size)

      const mapaCategorias: Record<string, CategoriaResumo> = {}
      const mapaCartoes: Record<string, CartaoResumo> = {}

      interacoes.forEach((item) => {
        if (item.categorias) {
          const categoriaId = item.categorias.id

          if (!mapaCategorias[categoriaId]) {
            mapaCategorias[categoriaId] = {
              id: categoriaId,
              nome: item.categorias.nome,
              total: 0,
            }
          }

          mapaCategorias[categoriaId].total += 1
        }

        if (item.cartoes) {
          const cartaoId = item.cartoes.id

          if (!mapaCartoes[cartaoId]) {
            mapaCartoes[cartaoId] = {
              id: cartaoId,
              nome: item.cartoes.nome,
              imagem: item.cartoes.imagem,
              total: 0,
            }
          }

          mapaCartoes[cartaoId].total += 1
        }
      })

      const rankingCategorias = Object.values(mapaCategorias).sort(
        (a, b) => b.total - a.total
      )

      const rankingCartoes = Object.values(mapaCartoes).sort(
        (a, b) => b.total - a.total
      )

      setCategoriasRanking(rankingCategorias)
      setCategoriaMaisUsada(rankingCategorias[0] ?? null)
      setCartoesRanking(rankingCartoes.slice(0, 5))
    } catch (e) {
      console.log("Erro ao buscar relatório do aluno:", e)
    } finally {
      setLoading(false)
    }
  }

  function voltar() {
    router.back()
  }

  return {
    nomeAluno,
    idade,
    sexo,
    loading,
    totalInteracoes,
    diasAtivos,
    categoriaMaisUsada,
    categoriasRanking,
    cartoesRanking,
    voltar,
  }
}