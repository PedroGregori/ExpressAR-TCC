import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import useLoginModel from './model'

import {
  logos,
  backgroundElements,
  avatar,
} from '@/assets/images'

export default function HomeScreenView({
  goToAluno,
  goToProfessor,
}: ReturnType<typeof useLoginModel>) {

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#DDE7EC"
      />

      {/* DECORAÇÕES */}

      <Image
        source={backgroundElements.borboleta}
        style={styles.borboleta}
      />

      <Image
        source={backgroundElements.arco}
        style={styles.arco}
      />

      <Image
        source={backgroundElements.pecas}
        style={styles.pecasLeft}
      />

      <Image
        source={backgroundElements.pecas}
        style={styles.pecasBottom}
      />

      <Image
        source={backgroundElements.grama}
        style={styles.grama}
      />

      {/* LOGO */}

      <View style={styles.logoArea}>
        <Image
          source={logos.expressar}
          style={styles.logo}
        />
      </View>

      {/* BOTÕES */}

      <View style={styles.buttonsArea}>

        <TouchableOpacity
          style={[styles.button, styles.buttonAluno]}
          onPress={goToAluno}
          activeOpacity={0.85}
        >
          <View style={styles.buttonIcon}>
            <Image
              source={avatar.aluna}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.buttonText}>
            Aluno
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonProfessor]}
          onPress={goToProfessor}
          activeOpacity={0.85}
        >
          <View style={styles.buttonIcon}>
            <Image
              source={avatar.aluno}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.buttonText}>
            Professor
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE7EC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
  },

  logoArea: {
    alignItems: 'center',
    marginBottom: hp('7%'),
    zIndex: 2,
  },

  logo: {
    width: wp('52%'),
    height: wp('52%'),
    resizeMode: 'contain',
  },

  buttonsArea: {
    width: '100%',
    gap: hp('2.5%'),
    zIndex: 2,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2.2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('5%'),
  },

  buttonAluno: {
    backgroundColor: '#63B7E6',
  },

  buttonProfessor: {
    backgroundColor: '#F4B63D',
  },

  buttonIcon: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('4%'),
  },

  avatar: {
    width: wp('12%'),
    height: wp('12%'),
    resizeMode: 'contain',
  },

  buttonText: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#FFFFFF',
  },

  borboleta: {
    position: 'absolute',
    top: hp('12%'),
    left: wp('-2%'),
    width: wp('18%'),
    height: wp('18%'),
    resizeMode: 'contain',
  },

  arco: {
    position: 'absolute',
    top: hp('24%'),
    right: wp('-2%'),
    width: wp('18%'),
    height: wp('18%'),
    resizeMode: 'contain',
  },

  pecasLeft: {
    position: 'absolute',
    left: wp('-5%'),
    bottom: hp('12%'),
    width: wp('28%'),
    height: wp('28%'),
    resizeMode: 'contain',
  },

  pecasBottom: {
    position: 'absolute',
    left: wp('8%'),
    bottom: hp('5%'),
    width: wp('22%'),
    height: wp('22%'),
    resizeMode: 'contain',
    transform: [{ rotate: '18deg' }],
  },

  grama: {
    position: 'absolute',
    right: wp('-3%'),
    bottom: hp('-1%'),
    width: wp('42%'),
    height: wp('42%'),
    resizeMode: 'contain',
  },
})