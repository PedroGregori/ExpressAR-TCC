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

import useSubCategoryModel from './model'
import SentenceBuilder from '@/components/SentenceBuilder'
import { useUserLogged } from '@/hooks/useUserLogged'
import UserHeader from '@/components/UserHeader'

export default function SubCategoryView({
  subcategorias,
  handleSubcategoria,
  handleVoltar,
  handleSair,
}: ReturnType<typeof useSubCategoryModel>) {
  const { nomeAluno } = useUserLogged()

  function getCardColor(index: number) {
    return index % 2 === 0 ? '#A7D3E8' : '#7EC0D8'
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5BC8E8" />

      <UserHeader
        nome={nomeAluno}
        onAction={handleSair}
        backgroundColor="#5BC8E8"
        emoji="👧"
      />

      <SentenceBuilder />

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[styles.categoriaCard, { backgroundColor: '#90A4AE' }]}
          onPress={handleVoltar}
          activeOpacity={0.85}
        >
          <Text style={styles.categoriaEmoji}>⬅️</Text>
          <Text style={styles.categoriaNome}>Voltar</Text>
        </TouchableOpacity>

        {subcategorias.map((sub, index) => (
          <TouchableOpacity
            key={sub.id}
            style={[
              styles.categoriaCard,
              { backgroundColor: getCardColor(index) },
            ]}
            onPress={() => handleSubcategoria(sub)}
            activeOpacity={0.85}
          >
            {sub.imagem ? (
              <Image
                source={{ uri: sub.imagem }}
                style={styles.categoriaImagem}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.categoriaEmoji}>❓</Text>
            )}

            <Text style={styles.categoriaNome}>{sub.nome}</Text>
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

  categoriaImagem: {
    width: wp('18%'),
    height: wp('18%'),
    marginBottom: hp('1%'),
  },

  categoriaEmoji: {
    fontSize: wp('12%'),
    marginBottom: hp('1%'),
  },

  categoriaNome: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#2e5486',
    textAlign: 'center',
  },
})