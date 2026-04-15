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
import useCategoriasTurmaModel from "./model"
import AppHeader from "@/components/AppHeader"
import { icons } from "@/assets/images"

export default function CategoriasTurmaView({
  nomeTurma,
  categorias,
  loading,
  voltar,
  irAdicionarCategoria,
  irDetalheCategoria,
}: ReturnType<typeof useCategoriasTurmaModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      <AppHeader
        title={nomeTurma}
        onBack={voltar}
        backgroundColor="#E8C96E"
        titleColor="#9C8346"
        iconColor="#8C7331"
        backImg={icons.yback}
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>Gerencie as categorias</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9C8346" />
            <Text style={styles.loadingText}>Carregando categorias...</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {categorias.map((categoria) => (
              <TouchableOpacity
                key={categoria.id}
                style={styles.card}
                onPress={() => irDetalheCategoria(categoria.id, categoria.nome)}
                activeOpacity={0.85}
              >
                <View style={styles.left}>
                  {categoria.imagem ? (
                    <Image
                      source={{ uri: categoria.imagem }}
                      style={styles.iconImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.placeholderIcon}>
                      <Text style={styles.placeholderText}>📁</Text>
                    </View>
                  )}

                  <View style={styles.info}>
                    <Text style={styles.nome}>{categoria.nome}</Text>
                    <Text style={styles.desc}>
                      {categoria.total_cartoes}{" "}
                      {categoria.total_cartoes === 1 ? "Cartão" : "Cartões"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={irAdicionarCategoria}
          activeOpacity={0.85}
        >
          <Text style={styles.addButtonText}>Adicionar categoria</Text>
        </TouchableOpacity>
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
    paddingHorizontal: wp("5%"),
    paddingTop: hp("3%"),
  },

  subtitle: {
    fontSize: wp("5%"),
    color: "#555",
    marginBottom: hp("2.5%"),
  },

  scrollContent: {
    paddingBottom: hp("2%"),
  },

  loadingContainer: {
    marginTop: hp("8%"),
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: hp("1.5%"),
    fontSize: wp("4%"),
    color: "#9C8346",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: wp("5%"),
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("4%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconImage: {
    width: wp("16%"),
    height: wp("16%"),
    marginRight: wp("3%"),
  },

  placeholderIcon: {
    width: wp("16%"),
    height: wp("16%"),
    borderRadius: wp("3%"),
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },

  placeholderText: {
    fontSize: wp("8%"),
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: wp("4.8%"),
    fontWeight: "700",
    color: "#4F4F4F",
    marginBottom: hp("0.3%"),
  },

  desc: {
    fontSize: wp("3.8%"),
    color: "#666",
  },

  arrow: {
    fontSize: wp("8%"),
    color: "#555",
    marginLeft: wp("2%"),
  },

  footer: {
    paddingHorizontal: wp("10%"),
    paddingBottom: hp("4%"),
    paddingTop: hp("1%"),
  },

  addButton: {
    backgroundColor: "#EFD06F",
    borderRadius: wp("6%"),
    paddingVertical: hp("2.2%"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C79C2E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 3,
  },

  addButtonText: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: "#9C8346",
  },
})