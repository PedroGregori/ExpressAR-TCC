import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useCriarCartaoModel from "./model"

export default function CriarCartaoView({
  nome,
  imagem,
  loading,
  setNome,
  setImagem,
  salvarCartao,
  irPesquisarImagem,
  irSelecionarGaleria,
}: ReturnType<typeof useCriarCartaoModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.back}>←</Text>
        <Text style={styles.title}>Criar cartões</Text>
        <Text style={styles.menu}>≡</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>

        {/* 🔥 IMAGEM OU OPÇÕES */}
        {!imagem ? (
          <View style={styles.optionBox}>
            <TouchableOpacity style={styles.optionTop} onPress={irPesquisarImagem}>
              <Text style={styles.icon}>🔍</Text>
              <Text style={styles.optionText}>Pesquise por pictograma</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.optionBottom} onPress={irSelecionarGaleria}>
              <Text style={styles.icon}>🖼️</Text>
              <Text style={styles.optionText}>Selecione na galeria</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <View style={styles.previewCard}>
              <Image source={{ uri: imagem }} style={styles.previewImage} />
            </View>

            <TouchableOpacity onPress={() => setImagem(null)}>
              <Text style={styles.remover}>Remover imagem</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* INPUT */}
        <Text style={styles.label}>Nome do Cartão</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do cartão"
          placeholderTextColor="#BFA76A"
          value={nome}
          onChangeText={setNome}
        />

        {/* ÁUDIO (COMO TAVA ANTES) */}
        <TouchableOpacity style={styles.audioButton}>
          <Text style={styles.audioIcon}>🎤</Text>
          <Text style={styles.audioText}>
            Pressione para gravar audio
          </Text>
        </TouchableOpacity>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.button}
          onPress={salvarCartao}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {loading ? "Salvando..." : "Criar cartão"}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E7C9",
  },

  /* HEADER */
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

  /* CARD */
  card: {
    backgroundColor: "#EFE7D6",
    margin: wp("4%"),
    borderRadius: wp("4%"),
    padding: wp("5%"),
  },

  /* OPTIONS */
  optionBox: {
    borderWidth: 1.5,
    borderColor: "#D4B56A",
    borderRadius: wp("4%"),
    height: wp("85%"),
    overflow: "hidden",
    marginBottom: hp("3%"),
  },
  optionTop: {
    alignItems: "center",
    paddingVertical: hp("5%"),
  },
  optionBottom: {
    alignItems: "center",
    paddingVertical: hp("3%"),
  },
  divider: {
    height: 1,
    backgroundColor: "#D4B56A",
  },
  icon: {
    fontSize: wp("10%"),
    marginBottom: hp("1%"),
    color: "#D4B56A",
  },
  optionText: {
    fontSize: wp("4%"),
    color: "#B89B55",
  },

  /* 🔥 PREVIEW DA IMAGEM */
  previewContainer: {
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  previewCard: {
    width: "100%",
    height: hp("35%"),
    backgroundColor: "#F7F1E3",
    borderRadius: wp("4%"),
    borderWidth: 1.5,
    borderColor: "#D4B56A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  previewImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  remover: {
    color: "#C94C4C",
    fontSize: wp("4%"),
  },

  /* INPUT */
  label: {
    fontSize: wp("3.8%"),
    color: "#9C8346",
    marginBottom: hp("1%"),
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#D4B56A",
    borderRadius: wp("3%"),
    padding: wp("3%"),
    marginBottom: hp("3%"),
    backgroundColor: "#F7F1E3",
    color: "#333",
  },

  /* AUDIO (COMO TAVA) */
  audioButton: {
    alignItems: "center",
    marginBottom: hp("4%"),
  },
  audioIcon: {
    fontSize: wp("22%"),
    color: "#D4B56A",
  },
  audioText: {
    fontSize: wp("4%"),
    color: "#B89B55",
    marginTop: hp("1%"),
  },

  /* BUTTON */
  button: {
    backgroundColor: "#F2C94C",
    paddingVertical: hp("2%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    shadowColor: "#C9A73D",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#6B5A2B",
  },
})