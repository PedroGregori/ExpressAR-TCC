import { useUserLogged } from '@/hooks/useUserLogged'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import useCategoryDetail from './model'

export default function CategoryDetailView({
  pictogramas,
  carregando,
  erro,
}: ReturnType<typeof useCategoryDetail>) {
  const { nomeAluno } = useUserLogged()

  function handleSair() {}

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5BC8E8" />

      {/* HEADER */}
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

        <TouchableOpacity style={styles.botaoSair} onPress={handleSair}>
          <Text style={styles.botaoSairTexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* GRID */}
      <ScrollView contentContainerStyle={styles.grid}>
        {carregando && <Text>Carregando...</Text>}
        {erro && <Text>{erro}</Text>}

        {pictogramas.map((p) => (
          <TouchableOpacity key={p.id} style={styles.card}>
            <Image source={{ uri: p.imagemUrl }} style={styles.image} />
            <Text style={styles.nome}>{p.nome}</Text>
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

  header: {
    backgroundColor: '#5BC8E8',
    paddingTop: hp('5%'),
    paddingBottom: hp('2.5%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
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
    color: '#fff',
  },

  headerNome: {
    fontSize: wp('5.5%'),
    fontWeight: '800',
    color: '#fff',
  },

  botaoSair: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    padding: wp('3%'),
    borderRadius: wp('3%'),
  },

  botaoSairTexto: {
    color: '#fff',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp('4%'),
    gap: wp('3%'),
    justifyContent: 'center',
  },

  card: {
    width: wp('42%'),
    height: wp('42%'),
    backgroundColor: '#fff',
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  image: {
    width: wp('20%'),
    height: wp('20%'),
    marginBottom: hp('1%'),
    resizeMode: 'contain',
  },

  nome: {
    fontSize: wp('3.8%'),
    fontWeight: '600',
  },
})