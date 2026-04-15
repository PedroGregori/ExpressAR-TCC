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

import useCategoriasScreen from './model'
import SentenceBuilder from '@/components/SentenceBuilder'
import UserHeader from '@/components/UserHeader'

export default function CategoryView({
  nomeAluno,
  handleSair,
  handleCategoria,
  categorias,
}: ReturnType<typeof useCategoriasScreen>) {

  function getCardColor(index: number) {
    return index % 2 === 0 ? '#bee8fa' : '#8bd1ef'
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
      {categorias.map((categoria, index) => (
        <TouchableOpacity
          key={categoria.id}
          style={[
            styles.categoriaCard,
            { backgroundColor: getCardColor(index) }
          ]}
          onPress={() => handleCategoria(categoria)}
          activeOpacity={0.85}
        >
          {categoria.imagem ? (
            <Image
              source={{ uri: categoria.imagem }}
              style={styles.categoriaImagem}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.categoriaEmoji}>❓</Text>
          )}

          <Text style={styles.categoriaNome}>
            {categoria.nome}
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

  /* GRID */
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
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.12,
    // shadowRadius: 8,
    // elevation: 4,
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