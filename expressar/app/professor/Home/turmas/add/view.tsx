import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { useState } from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import useAddTurmaModel from "./model"
import AppHeader from "@/components/AppHeader"

export default function AddTurmaView({
  nomeTurma,
  setNomeTurma,
  turno,
  setTurno,
  loading,
  error,
  handleCreateTurma,
  handleCancel,
}: ReturnType<typeof useAddTurmaModel>) {
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6CC24A" />

      <AppHeader
        title="Adicionar Turma"
        titleColor="#47892A"
        onBack={handleCancel}
        backgroundColor="#6BBA49"
      />

      {/* FORM */}
      <View style={styles.form}>
        {/* Campo Nome */}
        <Text style={styles.label}>Nome da turma</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da sua turma"
          placeholderTextColor="#777"
          value={nomeTurma}
          onChangeText={setNomeTurma}
        />

        {/* Campo Turno */}
        <Text style={styles.label}>Turno</Text>
        <DropDownPicker
          open={open}
          value={turno}
          items={[
            { label: "Matutino", value: "Matutino" },
            { label: "Vespertino", value: "Vespertino" },
          ]}
          setOpen={setOpen}
          setValue={setTurno}
          placeholder="Selecione o turno"
          placeholderStyle={{ color: "#777" }}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        {/* Mensagem de erro */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Botões */}
        {loading ? (
          <ActivityIndicator size="large" color="#6CC24A" />
        ) : (
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancel]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.create]}
              onPress={handleCreateTurma}
            >
              <Text style={styles.buttonText}>Criar turma</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#DDE6D5" },

  header: {
    backgroundColor: "#6CC24A",
    height: hp("12%"),
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: wp("6%"),
    borderBottomRightRadius: wp("6%"),
  },

  headerText: { color: "#fff", fontSize: wp("6%"), fontWeight: "bold" },

  form: {
    marginTop: hp("2%"),
    marginHorizontal: wp("4%"),
    backgroundColor: "#F6F8F3",
    borderRadius: wp("5%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2.5%"),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  label: {
    fontSize: wp("4%"),
    fontWeight: "700",
    marginTop: hp("1.5%"),
    marginBottom: hp("0.8%"),
    color: "#4F8A2F",
  },

  input: {
    backgroundColor: "#F6FFEE",
    borderRadius: wp("3%"),
    paddingHorizontal: wp("4%"),
    height: hp("6%"),
    borderWidth: 1.5,
    borderColor: "#8BCB67",
    color: "#333",
  },

  dropdown: {
    backgroundColor: "#F6F8F3",
    borderRadius: wp("3%"),
    minHeight: hp("6%"),
    borderWidth: 1.5,
    borderColor: "#8BCB67",
  },

  dropdownContainer: {
    backgroundColor: "#F6FFEE",
    borderWidth: 1.5,
    borderColor: "#8BCB67",
    borderRadius: wp("3%"),
    overflow: "hidden",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("3%"),
  },

  button: {
    flex: 1,
    height: hp("5.8%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("1.2%"),
  },

  cancel: { backgroundColor: "#D9534F" },

  create: { backgroundColor: "#6CC24A" },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("3.8%"),
  },

  errorText: {
    color: "#E53935",
    marginTop: hp("1%"),
    fontSize: wp("3.5%"),
    fontWeight: "600",
  },
})