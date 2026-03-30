const BASE_URL = 'https://api.arasaac.org/api'

export async function buscarPictogramas(palavra: string) {
  const response = await fetch(`${BASE_URL}/pictograms/pt/search/${palavra}`)

  if (!response.ok) {
    throw new Error('Erro na API')
  }

  return response.json()
}