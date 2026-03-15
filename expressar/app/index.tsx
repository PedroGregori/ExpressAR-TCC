import { useRouter } from 'expo-router'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default function HomeScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E7" />

      {/* Fundo decorativo — bolinhas coloridas */}
      <View style={[styles.bubble, styles.bubble1]} />
      <View style={[styles.bubble, styles.bubble2]} />
      <View style={[styles.bubble, styles.bubble3]} />
      <View style={[styles.bubble, styles.bubble4]} />

      {/* Logo e slogan */}
      <View style={styles.logoArea}>
        {/* Substitua pela imagem real: require('@/assets/images/logo.png') */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoPlaceholderText}>✋</Text>
        </View>
        <Text style={styles.appName}>Expressar</Text>
        <Text style={styles.slogan}>Falando sem palavras</Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonsArea}>

        {/* Botão Aluno */}
        <TouchableOpacity
          style={[styles.button, styles.buttonAluno]}
          onPress={() => router.push('/aluno')}
          activeOpacity={0.85}
        >
          {/* Substitua pela imagem real: require('@/assets/images/aluno-icon.png') */}
          <View style={styles.buttonIcon}>
            <Text style={styles.buttonIconText}>👧</Text>
          </View>
          <Text style={styles.buttonText}>Aluno</Text>
        </TouchableOpacity>

        {/* Botão Professor */}
        <TouchableOpacity
          style={[styles.button, styles.buttonProfessor]}
          onPress={() => router.push('/professor/auth/login')}
          activeOpacity={0.85}
        >
          {/* Substitua pela imagem real: require('@/assets/images/professor-icon.png') */}
          <View style={styles.buttonIcon}>
            <Text style={styles.buttonIconText}>👨‍🏫</Text>
          </View>
          <Text style={styles.buttonText}>Professor</Text>
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
    paddingHorizontal: 32,
  },

  // --- Decoração de fundo ---
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.25,
  },
  bubble1: {
    width: 180,
    height: 180,
    backgroundColor: '#F5A623',
    top: -40,
    left: -60,
  },
  bubble2: {
    width: 120,
    height: 120,
    backgroundColor: '#5BC8E8',
    top: 80,
    right: -30,
  },
  bubble3: {
    width: 100,
    height: 100,
    backgroundColor: '#7ED957',
    bottom: 120,
    left: -20,
  },
  bubble4: {
    width: 150,
    height: 150,
    backgroundColor: '#F5A623',
    bottom: -40,
    right: -50,
  },

  // --- Logo ---
  logoArea: {
    alignItems: 'center',
    marginBottom: 56,
  },
  logoPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  logoPlaceholderText: {
    fontSize: 52,
  },
  appName: {
    fontSize: 38,
    fontWeight: '800',
    color: '#2D2D2D',
    letterSpacing: 0.5,
  },
  slogan: {
    fontSize: 15,
    color: '#888888',
    marginTop: 4,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },

  // --- Botões ---
  buttonsArea: {
    width: '100%',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonAluno: {
    backgroundColor: '#5BC8E8', // azul claro — cor do fluxo do aluno
  },
  buttonProfessor: {
    backgroundColor: '#F5A623', // laranja — cor do fluxo do professor
  },
  buttonIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  buttonIconText: {
    fontSize: 28,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
})