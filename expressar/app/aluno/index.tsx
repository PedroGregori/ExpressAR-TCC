import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

// ============================================================
// MOCK — substituir pela chamada real do Supabase futuramente
// ============================================================
const MOCK_ALUNOS = [
  {
    id: '1',
    nome: 'Maria Silva',
    codigo: 'ALU-0001',
    turma_id: 'turma-1',
    foto_url: null,
  },
]

async function buscarAlunoPorCodigo(codigo: string) {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800))
  return MOCK_ALUNOS.find(
    (aluno) => aluno.codigo === codigo.toUpperCase().trim()
  ) ?? null
}
// ============================================================

export default function CodigoAlunoScreen() {
  const router = useRouter()
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleConfirmar() {
    if (!codigo.trim()) {
      setErro('Digite o código do aluno.')
      return
    }

    setErro('')
    setCarregando(true)

    try {
      const aluno = await buscarAlunoPorCodigo(codigo)

      if (!aluno) {
        setErro('Código inválido. Verifique e tente novamente.')
        return
      }

      // Salva o aluno localmente — nunca mais pede o código
      await AsyncStorage.setItem('aluno_id', aluno.id)
      await AsyncStorage.setItem('aluno_nome', aluno.nome)
      await AsyncStorage.setItem('aluno_codigo', aluno.codigo)

      // Navega para o home do aluno
      router.replace(`/aluno/${aluno.id}`)
    } catch (e) {
      setErro('Erro ao verificar o código. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E7" />

      {/* Decoração */}
      <View style={[styles.bubble, styles.bubble1]} />
      <View style={[styles.bubble, styles.bubble2]} />

      {/* Conteúdo */}
      <View style={styles.card}>

        <Text style={styles.emoji}>🔑</Text>
        <Text style={styles.titulo}>Olá! Qual é o seu código?</Text>
        <Text style={styles.subtitulo}>
          Peça para o seu professor digitar o código aqui.
        </Text>

        <TextInput
          style={[styles.input, erro ? styles.inputErro : null]}
          placeholder="Ex: ALU-0001"
          placeholderTextColor="#BBBBBB"
          value={codigo}
          onChangeText={(text) => {
            setCodigo(text)
            setErro('')
          }}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={8}
        />

        {/* Mensagem de erro */}
        {erro ? (
          <Text style={styles.textoErro}>⚠ {erro}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.botao, carregando && styles.botaoDesabilitado]}
          onPress={handleConfirmar}
          activeOpacity={0.85}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.botaoTexto}>Confirmar</Text>
          )}
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
  },

  // --- Decoração ---
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.2,
  },
  bubble1: {
    width: wp('50%'),
    height: wp('50%'),
    backgroundColor: '#5BC8E8',
    top: -hp('4%'),
    right: -wp('15%'),
  },
  bubble2: {
    width: wp('40%'),
    height: wp('40%'),
    backgroundColor: '#F5A623',
    bottom: -hp('3%'),
    left: -wp('10%'),
  },

  // --- Card ---
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: wp('6%'),
    paddingHorizontal: wp('7%'),
    paddingVertical: hp('4%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  emoji: {
    fontSize: wp('14%'),
    marginBottom: hp('1.5%'),
  },
  titulo: {
    fontSize: wp('6%'),
    fontWeight: '800',
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  subtitulo: {
    fontSize: wp('3.8%'),
    color: '#888888',
    textAlign: 'center',
    marginBottom: hp('3%'),
    lineHeight: wp('5.5%'),
  },

  // --- Input ---
  input: {
    width: '100%',
    height: hp('7%'),
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: wp('3.5%'),
    paddingHorizontal: wp('4%'),
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#2D2D2D',
    textAlign: 'center',
    letterSpacing: 2,
    backgroundColor: '#FAFAFA',
    marginBottom: hp('1%'),
  },
  inputErro: {
    borderColor: '#FF5252',
  },
  textoErro: {
    fontSize: wp('3.5%'),
    color: '#FF5252',
    marginBottom: hp('1.5%'),
    alignSelf: 'flex-start',
  },

  // --- Botão ---
  botao: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: '#5BC8E8',
    borderRadius: wp('3.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1.5%'),
    shadowColor: '#5BC8E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoTexto: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#FFFFFF',
  },
})