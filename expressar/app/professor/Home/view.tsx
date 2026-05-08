import { icons } from '@/assets/images'
import UserHeader from '@/components/UserHeader'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

type Props = {
  nome: string
  loading: boolean
  handleLogout: () => void
  goTurmas: () => void
  goCartoes: () => void
  goRelatorio: () => void
}

export default function HomeScreenView({
  nome,
  loading,
  handleLogout,
  goTurmas,
  goCartoes,
  goRelatorio,
}: Props) {
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#F4B544" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4B544" />

      <UserHeader
        nome={nome}
        onAction={handleLogout}
        backgroundColor="#F4B544"
      />

      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.card, styles.green]}
          onPress={goTurmas}
          activeOpacity={0.85}
        >
          <View style={styles.iconBox}>
            <Image
              source={icons.blackboard}
              style={styles.iconImage}
            />
          </View>

          <Text style={[styles.cardText, styles.greenText]}>
            Turmas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.yellow]}
          onPress={goCartoes}
          activeOpacity={0.85}
        >
          <View style={styles.iconBox}>
            <Image
              source={icons.createCard}
              style={styles.iconImage}
            />
          </View>

          <Text style={[styles.cardText, styles.yellowText]}>
            Cartões personalizados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.blue]}
          onPress={goRelatorio}
          activeOpacity={0.85}
        >
          <View style={styles.iconBox}>
            <Image
              source={icons.report}
              style={styles.iconImage}
            />
          </View>

          <Text style={[styles.cardText, styles.blueText]}>
            Relatório
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE6',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEAE6',
  },

  menu: {
    marginTop: hp('2.2%'),
    paddingHorizontal: wp('4%'),
    gap: hp('1.8%'),
  },

  card: {
    height: hp('9.5%'),
    borderRadius: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  iconBox: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('3.5%'),
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },

  iconImage: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },

  cardText: {
    fontSize: wp('4.4%'),
    fontWeight: '700',
    flexShrink: 1,
  },

  green: {
    backgroundColor: '#B9E7A5',
  },

  yellow: {
    backgroundColor: '#F0D06A',
  },

  blue: {
    backgroundColor: '#7DA8D8',
  },

  greenText: {
    color: '#3B7B2A',
  },

  yellowText: {
    color: '#8B6F1D',
  },

  blueText: {
    color: '#245A96',
  },
})