import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import usePesquisarImagemModel from "./model"

export default function PesquisarImagemView({
  busca,
  resultados,
  loading,
  setBusca,
  buscar,
  selecionarImagem,
  voltar,
}: ReturnType<typeof usePesquisarImagemModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Pesquisar pictograma</Text>

        <Text style={styles.menu}>≡</Text>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        
        {/* BUSCA */}
        <View style={styles.searchBox}>
          <TextInput
            value={busca}
            onChangeText={setBusca}
            placeholder="Digite algo..."
            placeholderTextColor="#BFA76A"
            style={styles.input}
            onSubmitEditing={buscar}
          />

          <TouchableOpacity style={styles.searchButton} onPress={buscar}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* RESULTADOS */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {resultados.map((item) => {
              const url = `https://static.arasaac.org/pictograms/${item._id}/${item._id}_300.png`

              return (
                <TouchableOpacity
                  key={item._id}
                  style={styles.imageBox}
                  onPress={() => selecionarImagem(item._id)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: url }} style={styles.image} />
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>

        {/* VAZIO */}
        {!loading && resultados.length === 0 && busca.length > 0 && (
          <Text style={styles.empty}>
            Nenhum pictograma encontrado
          </Text>
        )}
      </View>

      {/* LOADING OVERLAY */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#6B5A2B" />
          <Text style={styles.loadingText}>
            Carregando pictogramas...
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E7C9",
  },

  header: {
    backgroundColor: "#E8C96E",
    paddingTop: hp("6%"),
    paddingBottom: hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
  },
  back: {
    fontSize: wp("6%"),
    color: "#6B5A2B",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: "#6B5A2B",
  },
  menu: {
    fontSize: wp("6%"),
    color: "#6B5A2B",
  },

  content: {
    flex: 1,
    padding: wp("4%"),
  },

  /* SEARCH */
  searchBox: {
    flexDirection: "row",
    marginBottom: hp("2%"),
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#D4B56A",
    borderRadius: wp("3%"),
    padding: wp("3%"),
    backgroundColor: "#F7F1E3",
    color: "#333",
  },
  searchButton: {
    marginLeft: wp("2%"),
    backgroundColor: "#F2C94C",
    borderRadius: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
  },
  searchIcon: {
    fontSize: wp("5%"),
    color: "#6B5A2B",
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageBox: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: hp("2%"),
    backgroundColor: "#FFF",
    borderRadius: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
    padding: wp("2%"),
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  /* EMPTY */
  empty: {
    textAlign: "center",
    marginTop: hp("2%"),
    color: "#8C7A4A",
  },

  /* LOADING */
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(243, 231, 201, 0.85)",
  },
  loadingText: {
    marginTop: hp("2%"),
    fontSize: wp("4.5%"),
    color: "#6B5A2B",
    fontWeight: "600",
  },
})