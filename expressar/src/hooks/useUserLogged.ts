import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useUserLogged() {
  const [nomeAluno, setNomeAluno] = useState('')
  const [alunoId, setAlunoId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      try {
        const nome = await AsyncStorage.getItem('aluno_nome')
        const id = await AsyncStorage.getItem('aluno_id')

        if (nome) setNomeAluno(nome)
        if (id) setAlunoId(id)
      } catch (e) {
        console.error('Erro ao carregar dados do usuário:', e)
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [])

  return {
    nomeAluno,
    alunoId,
    loading,
  }
}