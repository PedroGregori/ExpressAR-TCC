import { supabase } from "@/lib/supabase"

export async function getAlunoByCodigo(codigo: string) {
  const { data, error } = await supabase
    .from('alunos')
    .select(`
      id,
      nome,
      codigo,
      turma_id
    `)
    .eq('codigo', codigo.toUpperCase().trim())
    .single()

  if (error || !data) return null

  return data
}