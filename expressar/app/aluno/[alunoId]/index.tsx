import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

// ============================================================
// Categorias fixas do MVP
// ============================================================
const CATEGORIAS = [
  { id: '1', nome: 'Comidas',      emoji: '🍎', cor: '#FF8A65' },
  { id: '2', nome: 'Emoções',      emoji: '😊', cor: '#FFB74D' },
  { id: '3', nome: 'Escola',       emoji: '🎒', cor: '#81C784' },
  { id: '4', nome: 'Necessidades', emoji: '🚿', cor: '#64B5F6' },
  { id: '5', nome: 'Comunicação',  emoji: '💬', cor: '#BA68C8' },
]

export default function CategoriasScreen() {
  const router = useRouter()
  const [nomeAluno, setNomeAluno] = useState('')
  const [alunoId, setAlunoId] = useState('')

  // Verifica AsyncStorage — redireciona para código se não tiver aluno salvo
  useEffect(() => {
    async function verificarAluno() {
      const id = await AsyncStorage.getItem('aluno_id')
      const nome = await AsyncStorage.getItem('aluno_nome')

      if (!id || !nome) {
        // Sem código salvo — pede para digitar
        router.replace('/aluno')
        return
      }

      setAlunoId(id)
      setNomeAluno(nome)
    }

    verificarAluno()
  }, [])

  function handleSair() {
    Alert.alert(
      'Sair do perfil',
      `Deseja sair do perfil de ${nomeAluno}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('aluno_id')
            await AsyncStorage.removeItem('aluno_nome')
            await AsyncStorage.removeItem('aluno_codigo')
            router.replace('/')
          },
        },
      ]
    )
  }

  function handleCategoria(categoriaId: string, categoriaNome: string) {
    router.push(`/aluno/${alunoId}/categoria/${categoriaId}`)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5BC8E8" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarEmoji}>👧</Text>
          </View>
          <View>
            <Text style={styles.headerBemVindo}>Bem vindo(a):</Text>
            <Text style={styles.headerNome}>{nomeAluno}</Text>
          </View>
        </View>

        {/* Botão sair */}
        <TouchableOpacity
          style={styles.botaoSair}
          onPress={handleSair}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoSairTexto}>⬅ Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Grid de categorias */}
      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIAS.map((categoria) => (
          <TouchableOpacity
            key={categoria.id}
            style={[styles.categoriaCard, { backgroundColor: categoria.cor }]}
            onPress={() => handleCategoria(categoria.id, categoria.nome)}
            activeOpacity={0.85}
          >
            <Text style={styles.categoriaEmoji}>{categoria.emoji}</Text>
            <Text style={styles.categoriaNome}>{categoria.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },

  // --- Header ---
  header: {
    backgroundColor: '#5BC8E8',
    paddingTop: hp('5%'),
    paddingBottom: hp('2.5%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  avatarPlaceholder: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: wp('7%'),
  },
  headerBemVindo: {
    fontSize: wp('3.5%'),
    color: 'rgba(255,255,255,0.85)',
  },
  headerNome: {
    fontSize: wp('5.5%'),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  botaoSair: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('3%'),
  },
  botaoSairTexto: {
    fontSize: wp('3.5%'),
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // --- Grid ---
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp('4%'),
    gap: wp('3%'),
    justifyContent: 'center',
    paddingBottom: hp('4%'),
  },
  categoriaCard: {
    width: wp('42%'),
    height: wp('42%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  categoriaEmoji: {
    fontSize: wp('12%'),
    marginBottom: hp('1%'),
  },
  categoriaNome: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
})