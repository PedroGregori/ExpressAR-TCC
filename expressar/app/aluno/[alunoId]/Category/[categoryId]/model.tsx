import { usePictogramas } from '@/hooks/usePictogramas';
import { useLocalSearchParams } from 'expo-router'

export default function useCategoryDetail(){
    const { nome } = useLocalSearchParams()

    const palavra = String(nome || '').toLowerCase()

    const { pictogramas, carregando, erro } = usePictogramas(palavra)

    return {
        pictogramas,
        carregando,
        erro,
    }
}