import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useAlunoModel from "./model"
import AppHeader from "@/components/AppHeader"
import { logos, icons } from "@/assets/images"

export default function AlunoView({
  aluno,
  loading,
  popupRemover,
  removendo,
  verRelatorio,
  editarAluno,
  abrirPopupRemover,
  fecharPopupRemover,
  confirmarRemocao,
  voltar,
}: ReturnType<typeof useAlunoModel>) {

  function renderAlunoAvatar(sexo?: string) {
    const masculino =
      sexo?.toLowerCase().includes("masc") || sexo?.toLowerCase() === "menino"

    return (
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarEmoji}>{masculino ? "👦" : "👧"}</Text>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6CC24A" />
      </View>
    )
  }

  if (!aluno) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Aluno não encontrado</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6CC24A" />

      <AppHeader
        title="Gerenciar Aluno"
        titleColor="#47892A"
        onBack={voltar}
        backgroundColor="#6BBA49"
      />

      <View style={styles.content}>
        <View style={styles.card}>

          {renderAlunoAvatar(aluno.sexo)}

          <Text style={styles.cardTitle}>{aluno.nome}</Text>

          <Text style={styles.cardSubtitle}>
            {aluno.idade} anos · {aluno.sexo}
          </Text>

          <Text style={styles.cardCode}>
            Código: {aluno.codigo}
          </Text>

          {/* BOTÃO RELATÓRIO */}
          <TouchableOpacity
            style={[styles.button, styles.blue]}
            onPress={verRelatorio}
            activeOpacity={0.85}
          >
            <View style={styles.buttonContent}>
              <Image source={icons.manageReport} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Ver relatório</Text>
            </View>
          </TouchableOpacity>

          {/* BOTÃO EDITAR */}
          <TouchableOpacity
            style={[styles.button, styles.yellow]}
            onPress={editarAluno}
            activeOpacity={0.85}
          >
            <View style={styles.buttonContent}>
              <Image source={icons.edit} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Editar aluno</Text>
            </View>
          </TouchableOpacity>

          {/* BOTÃO REMOVER */}
          <TouchableOpacity
            style={[styles.button, styles.red]}
            onPress={abrirPopupRemover}
            activeOpacity={0.85}
          >
            <View style={styles.buttonContent}>
              <Image source={icons.trash} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Remover aluno</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>

      {/* POPUP */}
      <Modal visible={popupRemover} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>

            <View style={[styles.popupCheckCircle, styles.popupWarningCircle]}>
              <Text style={styles.popupCheck}>!</Text>
            </View>

            <Text style={styles.popupTitle}>Remover aluno?</Text>

            <Text style={styles.popupName}>
              Tem certeza que deseja remover{" "}
              <Text style={styles.popupNameBold}>{aluno.nome}</Text>?
            </Text>

            <TouchableOpacity
              style={[styles.popupButton, styles.popupDanger]}
              onPress={confirmarRemocao}
              disabled={removendo}
            >
              <Text style={styles.popupPrimaryText}>
                {removendo ? "Removendo..." : "Sim, remover"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupButton, styles.popupSecondary]}
              onPress={fecharPopupRemover}
              disabled={removendo}
            >
              <Text style={styles.popupSecondaryText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDE6D5",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDE6D5",
  },

  content: {
    flex: 1,
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
  },

  card: {
    backgroundColor: "#F7F5F6",
    borderRadius: wp("5%"),
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2.2%"),
    paddingBottom: hp("2%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  avatarCircle: {
    width: wp("28%"),
    height: wp("28%"),
    borderRadius: wp("14%"),
    backgroundColor: "#E9EEF7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
    borderWidth: 1.5,
    borderColor: "#A7C7E7",
  },

  avatarEmoji: {
    fontSize: wp("14%"),
  },

  cardTitle: {
    fontSize: wp("5.4%"),
    fontWeight: "700",
    color: "#4A8B2C",
    textAlign: "center",
    marginBottom: hp("0.8%"),
  },

  cardSubtitle: {
    color: "#666",
    fontSize: wp("4%"),
    textAlign: "center",
    marginBottom: hp("0.5%"),
  },

  cardCode: {
    color: "#666",
    fontSize: wp("3.8%"),
    textAlign: "center",
    marginBottom: hp("2%"),
  },

  button: {
    width: "100%",
    paddingVertical: hp("1.7%"),
    borderRadius: wp("3%"),
    marginBottom: hp("2.5%"),
  },

  // 👇 ÍCONE + TEXTO
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // 👇 ÍCONE
  buttonIcon: {
    width: wp("5%"),
    height: wp("5%"),
    marginRight: wp("2%"),
    resizeMode: "contain",
  },

  // 👇 TEXTO
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: wp("4%"),
  },

  blue: {
    backgroundColor: "#5E9BDB",
  },

  yellow: {
    backgroundColor: "#EBCB57",
  },

  red: {
    backgroundColor: "#D9534F",
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    width: "92%",
    backgroundColor: "#F7F5F6",
    borderRadius: wp("5%"),
    paddingHorizontal: wp("6%"),
    paddingTop: hp("2.2%"),
    paddingBottom: hp("2%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  popupCheckCircle: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1.2%"),
  },

  popupWarningCircle: {
    backgroundColor: "#D9534F",
  },

  popupCheck: {
    color: "#fff",
    fontSize: wp("5%"),
    fontWeight: "bold",
  },

  popupTitle: {
    fontSize: wp("5.5%"),
    fontWeight: "700",
    color: "#4F8A2F",
    marginBottom: hp("1.3%"),
    textAlign: "center",
  },

  popupName: {
    fontSize: wp("4.2%"),
    color: "#555",
    marginBottom: hp("2%"),
    textAlign: "center",
    lineHeight: hp("2.8%"),
  },

  popupNameBold: {
    fontWeight: "700",
    color: "#4F8A2F",
  },

  popupButton: {
    width: "100%",
    minHeight: hp("5%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1.2%"),
  },

  popupDanger: {
    backgroundColor: "#D9534F",
  },

  popupSecondary: {
    backgroundColor: "#D9F0CE",
    borderWidth: 1,
    borderColor: "#5FA93E",
  },

  popupPrimaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: wp("3.9%"),
  },

  popupSecondaryText: {
    color: "#4F8A2F",
    fontWeight: "700",
    fontSize: wp("3.9%"),
  },
})