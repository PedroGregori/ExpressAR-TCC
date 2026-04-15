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
import useManageCategoryModel from "./model"
import { icons } from "@/assets/images"

export default function ManageCategoryView({
  nomeCategoria,
  subcategorias,
  loading,
  voltar,
  irCriarSubcategoria,
  irCriarCartao,
  irGerenciarSubcategoria,
}: ReturnType<typeof useManageCategoryModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      <AppHeader
        title="Gerenciar categoria"
        titleColor="#8F7630"
        iconColor="#8C7331"
        onBack={voltar}
        backImg={icons.yback}
        backgroundColor="#E8C96E"
      />

      <View style={styles.content}>
        <Text style={styles.categoryTitle}>{nomeCategoria}</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#D6A93C" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : (
          <>
            <ScrollView
              contentContainerStyle={styles.grid}
              showsVerticalScrollIndicator={false}
            >
              {subcategorias.map((subcategoria) => (
                <TouchableOpacity
                  key={subcategoria.id}
                  style={styles.card}
                  onPress={() =>
                    irGerenciarSubcategoria(subcategoria.id, subcategoria.nome)
                  }
                  activeOpacity={0.85}
                >
                  {subcategoria.imagem ? (
                    <Image
                      source={{ uri: subcategoria.imagem }}
                      style={styles.cardImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.emojiFallback}>📁</Text>
                  )}

                  <Text style={styles.cardText}>{subcategoria.nome}</Text>
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

            <TouchableOpacity
              style={styles.addButton}
              onPress={irCriarSubcategoria}
              activeOpacity={0.85}
            >
              <Text style={styles.addButtonText}>Adicionar subcategoria</Text>
            </TouchableOpacity>
          </>
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
    height: hp("17%"),
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

  addButton: {
    marginTop: "auto",
    backgroundColor: "#F2CF69",
    height: hp("6%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#B88A1F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },

  addButtonText: {
    color: "#8E742A",
    fontWeight: "700",
    fontSize: wp("4%"),
  },
})