import { useUserLogged } from '@/hooks/useUserLogged'
import { useRouter } from 'expo-router'

export default function useHomeScreenModel() {
  const router = useRouter()
  const {alunoId} = useUserLogged() // Custom Hook

  function goToAluno() {
    if (alunoId) {
      router.replace(`/aluno/${alunoId}`)
      return
    }
    
    router.push('/aluno')
  }

  function goToProfessor() {
    router.push('/professor/auth/login')
  }


  return {
    goToAluno,
    goToProfessor,
  }
}