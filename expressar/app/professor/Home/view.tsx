import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
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
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4B544" />

      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 28 }}>👨</Text>
        </View>

        <View>
          <Text style={styles.welcome}>Bem vindo(a):</Text>
          <Text style={styles.name}>{nome}</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={[styles.card, styles.green]} onPress={goTurmas}>
          <Text style={styles.cardText}>📚 Turmas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.yellow]} onPress={goCartoes}>
          <Text style={styles.cardText}>🧩 Criar cartões</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.blue]} onPress={goRelatorio}>
          <Text style={styles.cardText}>📊 Relatório</Text>
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
  },

  header: {
    backgroundColor: '#F4B544',
    height: hp('18%'),
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },

  avatar: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcome: {
    color: '#fff',
    fontSize: wp('3.5%'),
  },

  name: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: '800',
  },

  logoutBtn: {
    backgroundColor: '#F8D48A',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('3%'),
  },

  logoutText: {
    color: '#fff',
    fontWeight: '700',
  },

  menu: {
    marginTop: hp('3%'),
    paddingHorizontal: wp('5%'),
    gap: hp('2%'),
  },

  card: {
    height: hp('10%'),
    borderRadius: wp('4%'),
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },

  cardText: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#333',
  },

  green: {
    backgroundColor: '#A7D7A1',
  },

  yellow: {
    backgroundColor: '#E8C66A',
  },

  blue: {
    backgroundColor: '#7EA3C8',
  },
})