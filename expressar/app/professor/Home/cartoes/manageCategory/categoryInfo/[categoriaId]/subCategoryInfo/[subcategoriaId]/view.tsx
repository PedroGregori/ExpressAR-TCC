import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import AppHeader from "@/components/AppHeader"
import useManageSubCategoryModel from "./model"
import { icons } from "@/assets/images"

export default function ManageSubCategoryView({
  nomeSubcategoria,
  cartoes,
  loading,
  voltar,
  irCriarCartao,
  irGerenciarCartao,
}: ReturnType<typeof useManageSubCategoryModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      <AppHeader
        title="Gerenciar subcategoria"
        titleColor="#8F7630"
        iconColor="#8C7331"
        onBack={voltar}
        backImg={icons.yback}
        backgroundColor="#E8C96E"
      />

      <View style={styles.content}>
        <Text style={styles.categoryTitle}>{nomeSubcategoria}</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#D6A93C" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          >
            {cartoes.map((cartao) => (
              <TouchableOpacity
                key={`card-${cartao.id}`}
                style={styles.card}
                onPress={() => irGerenciarCartao(cartao.id, cartao.nome)}
                activeOpacity={0.85}
              >
                {cartao.imagem ? (
                  <Image
                    source={{ uri: cartao.imagem }}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.emojiFallback}>🃏</Text>
                )}

                <Text style={styles.cardText}>{cartao.nome}</Text>
                <Text style={styles.cardType}>Cartão</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.card, styles.addCard]}
              onPress={irCriarCartao}
              activeOpacity={0.85}
            >
              <Text style={styles.addIcon}>＋</Text>
              <Text style={styles.cardText}>Adicionar cartão</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EEDC",
  },

  content: {
    flex: 1,
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
  },

  categoryTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "700",
    color: "#5B4A21",
    marginBottom: hp("1.8%"),
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: hp("1.2%"),
    fontSize: wp("4%"),
    color: "#8F7630",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: hp("2%"),
  },

  card: {
    width: "47%",
    height: hp("18%"),
    backgroundColor: "#F7F5F1",
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1.8%"),
    paddingHorizontal: wp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  cardImage: {
    width: wp("18%"),
    height: wp("18%"),
    marginBottom: hp("1%"),
  },

  emojiFallback: {
    fontSize: wp("11%"),
    marginBottom: hp("1%"),
  },

  cardText: {
    fontSize: wp("3.5%"),
    fontWeight: "700",
    color: "#8C6C18",
    textAlign: "center",
  },

  cardType: {
    marginTop: hp("0.6%"),
    fontSize: wp("3%"),
    color: "#B1944C",
    textAlign: "center",
  },

  addCard: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#D4B56A",
    backgroundColor: "#F7EBC4",
  },

  addIcon: {
    fontSize: wp("16%"),
    color: "#E2B853",
    fontWeight: "400",
    lineHeight: wp("16%"),
  },
})