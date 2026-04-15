import { icons } from "@/assets/images"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

type Props = {
  imagem: string | null
  setImagem: (value: string | null) => void
  onPesquisarPictograma: () => void
  onSelecionarGaleria: () => void
  textoPesquisar?: string
  textoGaleria?: string
}

export default function ImageSelector({
  imagem,
  setImagem,
  onPesquisarPictograma,
  onSelecionarGaleria,
  textoPesquisar = "Pesquise pictogramas",
  textoGaleria = "Selecione na galeria",
}: Props) {
  return (
    <View>
      {!imagem ? (
        <View style={styles.optionBox}>
          <TouchableOpacity
            style={styles.optionTop}
            onPress={onPesquisarPictograma}
            activeOpacity={0.8}
          >
            <Image source={icons.searchPic}></Image>
            <Text style={styles.optionText}>{textoPesquisar}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.optionBottom}
            onPress={onSelecionarGaleria}
            activeOpacity={0.8}
          >
            <Image source={icons.uploadGallery}></Image>
            <Text style={styles.optionText}>{textoGaleria}</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  optionBox: {
    borderWidth: 1.5,
    borderColor: "#D4B56A",
    borderRadius: wp("5%"),
    overflow: "hidden",
    marginBottom: hp("3%"),
    backgroundColor: "#F9F7F2",
  },

  optionTop: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("4%"),
  },

  optionBottom: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("4%"),
  },

  divider: {
    height: 1,
    backgroundColor: "#D4B56A",
  },

  icon: {
    fontSize: wp("15%"),
    color: "#D4B56A",
    marginBottom: hp("1%"),
  },

  optionText: {
    fontSize: wp("5%"),
    color: "#C4A85B",
    textAlign: "center",
  },

  previewContainer: {
    alignItems: "center",
    marginBottom: hp("3%"),
  },

  previewCard: {
    width: "100%",
    height: hp("25%"),
    backgroundColor: "#F9F7F2",
    borderRadius: wp("5%"),
    borderWidth: 1.5,
    borderColor: "#D4B56A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },

  previewImage: {
    width: "78%",
    height: "78%",
    resizeMode: "contain",
  },

  remover: {
    color: "#C94C4C",
    fontSize: wp("4%"),
  },
})