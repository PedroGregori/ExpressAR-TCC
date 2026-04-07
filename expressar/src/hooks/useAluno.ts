import { useState } from 'react'
import { getAlunoByCodigo } from '@/services/supabase/alunosService'

export function useLoginAluno() {
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [aluno, setAluno] = useState<any>(null)

  async function entrar(codigo: string) {
    setLoading(true)
    setErro('')

    const aluno = await getAlunoByCodigo(codigo)

    if (!aluno) {
    setErro('Código inválido')
    setLoading(false)
    return
    }

    setAluno(aluno)
    setLoading(false)
  }

  return {
    aluno,
    loading,
    erro,
    entrar
  }
}