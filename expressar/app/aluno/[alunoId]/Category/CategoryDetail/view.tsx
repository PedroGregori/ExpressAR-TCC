import { useUserLogged } from '@/hooks/useUserLogged'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import useCategoryDetail from './model'
import { useTextToSpeech } from '@/hooks/useAudio'
import { useSentenceBuilder } from '@/hooks/useSentenceBuilder'
import SentenceBuilder from '@/components/SentenceBuilder'
import UserHeader from '@/components/UserHeader'

export default function CategoryDetailView({
  cartoes,
  loading,
  erro,
  handleVoltar,
  registrarInteracaoCartao,
}: ReturnType<typeof useCategoryDetail>) {
  const { nomeAluno } = useUserLogged()
  const { falar } = useTextToSpeech()
  const { adicionar } = useSentenceBuilder()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5BC8E8" />

      <UserHeader
        nome={nomeAluno}
        onAction={handleVoltar}
        backgroundColor="#5BC8E8"
        emoji="👧"
      />

      <SentenceBuilder />

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[styles.card, styles.backCard]}
          onPress={handleVoltar}
          activeOpacity={0.85}
        >
          <Text style={styles.categoriaEmoji}>⬅️</Text>
          <Text style={styles.categoriaNome}>Voltar</Text>
        </TouchableOpacity>

        {loading && (
          <View style={styles.stateBox}>
            <ActivityIndicator size="large" color="#5BC8E8" />
            <Text style={styles.stateText}>Carregando...</Text>
          </View>
        )}

        {!loading && !!erro && (
          <View style={styles.stateBox}>
            <Text style={styles.errorText}>{erro}</Text>
          </View>
        )}

        {!loading && !erro && cartoes.length === 0 && (
          <View style={styles.stateBox}>
            <Text style={styles.stateText}>Nenhum cartão encontrado.</Text>
          </View>
        )}

        {!loading &&
          !erro &&
          cartoes.map((cartao, index) => (
            <TouchableOpacity
              key={`${cartao.id}-${index}`}
              style={styles.card}
              onPress={async () => {
                await registrarInteracaoCartao(cartao)

                falar(cartao.nome, () => {
                  adicionar({
                    id: cartao.id,
                    nome: cartao.nome,
                    imagemUrl: cartao.imagem,
                  })
                })
              }}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: cartao.imagem }}
                style={styles.image}
              />

              <Text style={styles.nome}>
                {cartao.nome}
              </Text>
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

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp('4%'),
    gap: wp('3%'),
    justifyContent: 'center',
    paddingBottom: hp('4%'),
  },

  card: {
    width: wp('42%'),
    height: wp('42%'),
    backgroundColor: '#FFFFFF',
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  backCard: {
    backgroundColor: '#90A4AE',
  },

  image: {
    width: wp('20%'),
    height: wp('20%'),
    marginBottom: hp('1%'),
    resizeMode: 'contain',
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

  nome: {
    fontSize: wp('4%'),
    fontWeight: '700',
    textAlign: 'center',
    color: '#2e5486',
    paddingHorizontal: wp('2%'),
  },

  stateBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('3%'),
  },

  stateText: {
    marginTop: hp('1%'),
    fontSize: wp('4%'),
    color: '#4F6F7A',
    textAlign: 'center',
  },

  errorText: {
    fontSize: wp('4%'),
    color: '#D9534F',
    textAlign: 'center',
    fontWeight: '600',
  },
})