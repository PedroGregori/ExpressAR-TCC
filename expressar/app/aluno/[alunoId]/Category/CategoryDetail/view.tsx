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
import { useTextToSpeech } from '@/hooks/useAudio'

import { useSentenceBuilder } from '@/hooks/useSentenceBuilder'
import SentenceBuilder from '@/components/SentenceBuilder'

export default function CategoryDetailView({
  pictogramas,
  carregando,
  erro,
  handleVoltar,
}: ReturnType<typeof useCategoryDetail>) {
  const { nomeAluno } = useUserLogged()
  const { falar } = useTextToSpeech()
  const { adicionar } = useSentenceBuilder()

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
      </View>

      {/* CONSTRUTOR */}
      <SentenceBuilder />

      {/* GRID */}
      <ScrollView contentContainerStyle={styles.grid}>
        
        {/* 🔥 BOTÃO VOLTAR (PADRÃO IGUAL SUBCATEGORY) */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#90A4AE' }]}
          onPress={handleVoltar}
          activeOpacity={0.85}
        >
          <Text style={styles.categoriaEmoji}>⬅️</Text>
          <Text style={styles.categoriaNome}>Voltar</Text>
        </TouchableOpacity>

        {/* ESTADOS */}
        {carregando && <Text>Carregando...</Text>}
        {erro && <Text>{erro}</Text>}

        {/* PICTOGRAMAS */}
        {pictogramas.map((p, index) => (
          <TouchableOpacity
            key={`${p.id}-${index}`}
            style={styles.card}
            onPress={() => {
              falar(p.nome, () => {
                adicionar(p)
              })
            }}
            activeOpacity={0.85}
          >
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

  // 🔥 IGUAL AO SUBCATEGORY
  categoriaEmoji: {
    fontSize: wp('12%'),
    marginBottom: hp('1%'),
  },

  categoriaNome: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },

  // usado nos pictogramas
  nome: {
    fontSize: wp('4%'),
    fontWeight: '700',
    textAlign: 'center',
  },
})