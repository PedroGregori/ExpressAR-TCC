import { useLocalSearchParams, useRouter } from 'expo-router'
import { usePictogramas } from '@/hooks/usePictogramas'

export default function useCategoryDetail() {
  const { nome } = useLocalSearchParams()
  const router = useRouter()

  const { pictogramas, carregando, erro } =
    usePictogramas(String(nome))

  function handleVoltar() {
    router.back()
  }

  return {
    pictogramas,
    carregando,
    erro,
    handleVoltar, // 👈 adiciona isso
  }
}