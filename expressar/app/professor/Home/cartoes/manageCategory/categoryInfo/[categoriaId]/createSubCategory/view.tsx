import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import useCriarSubcategoriaModel from "./model"

import ImageSelector from "@/components/ImageSelector"
import AppHeader from "@/components/AppHeader"

import { icons } from "@/assets/images"

export default function CriarSubcategoriaView({
  nome,
  imagem,
  loading,
  setNome,
  setImagem,
  criarSubcategoria,
  voltar,
  irPesquisarImagem,
  irSelecionarGaleria,
}: ReturnType<typeof useCriarSubcategoriaModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      <AppHeader
        title="Criar subcategoria"
        onBack={voltar}
        backgroundColor="#E8C96E"
        titleColor="#9C8346"
        iconColor="#8C7331"
        backImg={icons.yback}
      />

      <View style={styles.content}>
        <View style={styles.card}>
          <ImageSelector
            imagem={imagem}
            setImagem={setImagem}
            onPesquisarPictograma={irPesquisarImagem}
            onSelecionarGaleria={irSelecionarGaleria}
            textoPesquisar="Pesquise pictogramas"
            textoGaleria="Selecione na galeria"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite o nome da subcategoria"
            placeholderTextColor="#C4A85B"
            value={nome}
            onChangeText={setNome}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={criarSubcategoria}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {loading ? "Criando..." : "Criar subcategoria"}
          </Text>
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

  card: {
    backgroundColor: "#F4F2ED",
    borderRadius: wp("6%"),
    padding: wp("6%"),
  },

  input: {
    borderWidth: 1.5,
    borderColor: "#D4B56A",
    borderRadius: wp("4%"),
    backgroundColor: "#F9F7F2",
    color: "#6B5A2B",
    fontSize: wp("4.6%"),
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("4%"),
  },

  footer: {
    paddingHorizontal: wp("10%"),
    paddingBottom: hp("4%"),
  },

  button: {
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

  buttonText: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: "#9C8346",
    }   
}
)