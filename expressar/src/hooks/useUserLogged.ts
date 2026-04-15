import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useUserLogged() {
  const [aluno, setAluno] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const alunoStorage = await AsyncStorage.getItem('aluno')

      if (alunoStorage) {
        const parsed = JSON.parse(alunoStorage)
        setAluno(parsed)
      }

      setLoading(false)
    }

    load()
  }, [])

  return {
    aluno,
    alunoId: aluno?.id,
    nomeAluno: aluno?.nome,
    turmaId: aluno?.turma_id, // 🔥 ESSENCIAL
    loading,
  }
}