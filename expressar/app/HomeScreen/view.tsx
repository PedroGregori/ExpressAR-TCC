import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import useLoginModel from './model'

export default function HomeScreenView({
  goToAluno,
  goToProfessor,

}: ReturnType<typeof useLoginModel>) {

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
          onPress={goToAluno}
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
          onPress={goToProfessor}
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
    paddingHorizontal: wp('8%'),
  },

  // --- Decoração de fundo ---
  bubble: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.25,
  },
  bubble1: {
    width: wp('45%'),
    height: wp('45%'),
    backgroundColor: '#F5A623',
    top: -hp('3%'),
    left: -wp('10%'),
  },
  bubble2: {
    width: wp('30%'),
    height: wp('30%'),
    backgroundColor: '#5BC8E8',
    top: hp('8%'),
    right: -wp('5%'),
  },
  bubble3: {
    width: wp('25%'),
    height: wp('25%'),
    backgroundColor: '#7ED957',
    bottom: hp('14%'),
    left: -wp('3%'),
  },
  bubble4: {
    width: wp('38%'),
    height: wp('38%'),
    backgroundColor: '#F5A623',
    bottom: -hp('3%'),
    right: -wp('8%'),
  },

  // --- Logo ---
  logoArea: {
    alignItems: 'center',
    marginBottom: hp('7%'),
  },
  logoPlaceholder: {
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('6%'),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  logoPlaceholderText: {
    fontSize: wp('13%'),
  },
  appName: {
    fontSize: wp('10%'),
    fontWeight: '800',
    color: '#2D2D2D',
    letterSpacing: 0.5,
  },
  slogan: {
    fontSize: wp('4%'),
    color: '#888888',
    marginTop: hp('0.5%'),
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },

  // --- Botões ---
  buttonsArea: {
    width: '100%',
    gap: hp('2%'),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2.2%'),
    paddingHorizontal: wp('7%'),
    borderRadius: wp('5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonAluno: {
    backgroundColor: '#5BC8E8',
  },
  buttonProfessor: {
    backgroundColor: '#F5A623',
  },
  buttonIcon: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: wp('3.5%'),
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('4%'),
  },
  buttonIconText: {
    fontSize: wp('7%'),
  },
  buttonText: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
})