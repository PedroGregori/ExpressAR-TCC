// 🔥 mapa de filtros por categoria/subcategoria
export const filtros: Record<string, string[]> = {
  frutas: [
    'banana',
    'maçã',
    'laranja',
    'mamão',
    'melancia',
    'uva',
    'manga',
    'abacaxi',
    'morango',
    'laranja',
    'pêra',
  ],

  bebidas: [
    'água',
    'suco',
    'leite',
    'refrigerante',
    'suco de laranja', 
    'suco de abacaxi',
    'suco de maçã',
    'suco de caixa',
    'suco de uva'

  ],

  almoco: [
    'arroz',
    'feijão',
    'carne',
    'macarrão',
  ],
}

// 🔥 função inteligente
export function filtrarPorCategoria(dados: any[], categoria: string) {
  const lista = filtros[categoria.toLowerCase()]

  // 👉 se NÃO tiver filtro → retorna tudo
  if (!lista) return dados

  // 👉 se tiver filtro → filtra
  return dados.filter((item: any) => {
    const nome = item.keywords?.[0]?.keyword?.toLowerCase()
    return lista.includes(nome)
  })
}