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
import { icons } from "@/assets/images"
import AppHeader from "@/components/AppHeader"
import ImageSelector from "@/components/ImageSelector"

export default function CriarCartaoView({
  nome,
  imagem,
  loading,
  setNome,
  setImagem,
  salvarCartao,
  voltar,
  irPesquisarImagem,
  irSelecionarGaleria,
}: ReturnType<typeof useCriarCartaoModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      <AppHeader
        title="Criar cartões"
        titleColor="#6B5A2B"
        backgroundColor="#E8C96E"
        iconColor="#D4B56A"
        backImg={icons.yback}
        onBack={voltar}
      />

      <View style={styles.card}>
        <ImageSelector
          imagem={imagem}
          setImagem={setImagem}
          onPesquisarPictograma={irPesquisarImagem}
          onSelecionarGaleria={irSelecionarGaleria}
          textoPesquisar="Pesquise por pictograma"
          textoGaleria="Selecione na galeria"
        />

        <Text style={styles.label}>Nome do Cartão</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do cartão"
          placeholderTextColor="#BFA76A"
          value={nome}
          onChangeText={setNome}
        />

        <TouchableOpacity style={styles.audioButton} activeOpacity={0.8}>
          <Image source={icons.recordAudio} style={styles.audioImage} />
          <Text style={styles.audioText}>Pressione para gravar áudio</Text>
        </TouchableOpacity>

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

  card: {
    backgroundColor: "#EFE7D6",
    margin: wp("4%"),
    borderRadius: wp("4%"),
    padding: wp("5%"),
  },

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

  audioButton: {
    alignItems: "center",
    marginBottom: hp("4%"),
  },

  audioImage: {
    width: wp("20%"),
    height: wp("20%"),
    resizeMode: "contain",
    marginBottom: hp("1%"),
  },

  audioText: {
    fontSize: wp("4%"),
    color: "#B89B55",
    marginTop: hp("1%"),
  },

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