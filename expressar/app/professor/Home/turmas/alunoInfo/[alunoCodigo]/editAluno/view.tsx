import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  ActivityIndicator,
} from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { useState } from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import AppHeader from "@/components/AppHeader"
import useEditAlunoModel from "./model"

export default function EditAlunoView({
  nome,
  idade,
  sexo,
  alunoCodigo,
  loading,
  salvando,
  erro,
  popup,
  setNome,
  setIdade,
  setSexo,
  salvarEdicao,
  verAluno,
  voltar,
}: ReturnType<typeof useEditAlunoModel>) {
  const [open, setOpen] = useState(false)

  const avatarEmoji =
    sexo === "Masculino" ? "👦" : sexo === "Feminino" ? "👧" : "🙂"

    if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6CC24A" />
      </View>
    )
  }

  if (erro && !nome && !idade && !sexo) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{erro}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6CC24A" />

      <AppHeader
        title="Editar aluno"
        titleColor="#47892A"
        onBack={voltar}
        backgroundColor="#6BBA49"
      />

      <View style={styles.content}>
        <View style={[styles.formCard, open && { zIndex: 1000 }]}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatar}>{avatarEmoji}</Text>
            </View>

            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✓</Text>
            </View>

            <Text style={styles.avatarText}>Selecione o avatar</Text>
          </View>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do aluno"
            placeholderTextColor="#B0B0B0"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a idade"
            placeholderTextColor="#B0B0B0"
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
          />

          <Text style={styles.label}>Gênero</Text>
          <DropDownPicker
            open={open}
            value={sexo}
            items={[
              { label: "Masculino", value: "Masculino" },
              { label: "Feminino", value: "Feminino" },
            ]}
            setOpen={setOpen}
            setValue={setSexo}
            placeholder="Selecione o gênero"
            placeholderStyle={{ color: "#B0B0B0" }}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            zIndex={3000}
            zIndexInverse={1000}
          />

          <Text style={styles.label}>Código do aluno</Text>
          <View style={styles.codigoBox}>
            <Text style={styles.codigoText}>{alunoCodigo}</Text>
          </View>

          {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancel]}
              onPress={voltar}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.add]}
              onPress={salvarEdicao}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>
                {salvando ? "Salvando..." : "Salvar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal visible={!!popup} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <View style={styles.popupCheckCircle}>
              <Text style={styles.popupCheck}>✓</Text>
            </View>

            <Text style={styles.popupTitle}>Aluno atualizado!</Text>

            {popup && (
              <>
                <Text style={styles.popupCode}>Código: {popup.alunoCodigo}</Text>
                <Text style={styles.popupName}>{popup.nome}</Text>
              </>
            )}

            <TouchableOpacity
              style={[styles.popupButton, styles.popupPrimary]}
              onPress={verAluno}
              activeOpacity={0.85}
            >
              <Text style={styles.popupPrimaryText}>Ver aluno</Text>
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

  formCard: {
    backgroundColor: "#F7F5F6",
    borderRadius: wp("5%"),
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2.2%"),
    paddingBottom: hp("2.2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: hp("1.8%"),
    position: "relative",
  },

  avatarCircle: {
    width: wp("28%"),
    height: wp("28%"),
    borderRadius: wp("14%"),
    backgroundColor: "#EAF3FB",
    borderWidth: 1.5,
    borderColor: "#A8CAE7",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    fontSize: wp("14%"),
  },

  checkBadge: {
    position: "absolute",
    right: wp("28%"),
    bottom: hp("3.2%"),
    width: wp("7%"),
    height: wp("7%"),
    borderRadius: wp("3.5%"),
    backgroundColor: "#6CC24A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F7F5F6",
  },

  checkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("3.5%"),
  },

  avatarText: {
    marginTop: hp("1%"),
    fontSize: wp("4%"),
    color: "#5A9B38",
    fontWeight: "600",
  },

  label: {
    fontSize: wp("4%"),
    fontWeight: "700",
    marginTop: hp("1.2%"),
    marginBottom: hp("0.8%"),
    color: "#4F8A2F",
  },

  input: {
    backgroundColor: "#F6F8F3",
    borderRadius: wp("3%"),
    paddingHorizontal: wp("4%"),
    height: hp("5.8%"),
    borderWidth: 1.4,
    borderColor: "#8BCB67",
    color: "#333",
  },

  dropdown: {
    backgroundColor: "#F6F8F3",
    borderRadius: wp("3%"),
    minHeight: hp("5.8%"),
    borderWidth: 1.4,
    borderColor: "#8BCB67",
  },

  dropdownContainer: {
    backgroundColor: "#F6F8F3",
    borderWidth: 1.4,
    borderColor: "#8BCB67",
    borderRadius: wp("3%"),
    overflow: "hidden",
  },

  dropdownText: {
    color: "#333",
    fontSize: wp("3.8%"),
  },

  codigoBox: {
    backgroundColor: "#ECECEC",
    borderRadius: wp("3%"),
    paddingHorizontal: wp("4%"),
    height: hp("5.8%"),
    borderWidth: 1.2,
    borderColor: "#CFCFCF",
    justifyContent: "center",
  },

  codigoText: {
    color: "#666",
    fontSize: wp("3.9%"),
    fontWeight: "600",
  },

  errorText: {
    color: "#D9534F",
    marginTop: hp("1.2%"),
    fontSize: wp("3.6%"),
    fontWeight: "600",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("2.5%"),
  },

  button: {
    flex: 1,
    height: hp("5.6%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("1.2%"),
  },

  cancel: {
    backgroundColor: "#D9534F",
  },

  add: {
    backgroundColor: "#6CC24A",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: wp("3.7%"),
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
    backgroundColor: "#6CC24A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1.2%"),
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

  popupCode: {
    fontSize: wp("4.4%"),
    color: "#555",
    marginBottom: hp("0.7%"),
    textAlign: "center",
  },

  popupName: {
    fontSize: wp("5%"),
    color: "#4F8A2F",
    fontWeight: "700",
    marginBottom: hp("2%"),
    textAlign: "center",
  },

  popupButton: {
    width: "100%",
    minHeight: hp("5%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1.2%"),
  },

  popupPrimary: {
    backgroundColor: "#6CC24A",
  },

  popupPrimaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: wp("3.9%"),
  },
})