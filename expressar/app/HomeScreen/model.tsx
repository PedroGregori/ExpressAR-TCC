import { useUserLogged } from '@/hooks/useUserLogged'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'

export default function useHomeScreenModel() {
  const router = useRouter()
  const { alunoId } = useUserLogged()

  function goToAluno() {
    if (alunoId) {
      router.replace(`/aluno/${alunoId}/Category`)
      return
    }
    
    router.push('/aluno/ClassCode')
  }

  useEffect(() => {
  test()
}, [])

async function test() {
  const { data } = await supabase.auth.getSession()
  console.log('SESSION:', data.session)
}

  async function goToProfessor() {
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.user) {
      // 🔥 já está logado
      router.replace('/professor/Home')
    } else {
      // 🔥 não está logado
      router.push('/professor/auth/login')
    }
  }

  return {
    goToAluno,
    goToProfessor,
  }
}