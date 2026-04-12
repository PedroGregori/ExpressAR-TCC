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

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Adicionar turma</Text>
      </View>

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
  form: { flex: 1, padding: wp("5%") },
  label: {
    fontSize: wp("4%"),
    fontWeight: "600",
    marginTop: hp("2%"),
    color: "#2E7D32",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginTop: hp("1%"),
    borderWidth: 2,
    borderColor: "#6CC24A", // 🔥 borda verde
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    marginTop: hp("1%"),
    borderWidth: 2,
    borderColor: "#6CC24A", // 🔥 borda verde
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#6CC24A", // 🔥 borda verde
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("4%"),
  },
  button: {
    flex: 1,
    height: hp("6%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("1%"),
  },
  cancel: { backgroundColor: "#E57373" },
  create: { backgroundColor: "#6CC24A" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: wp("4%") },
  errorText: {
    color: "#E53935",
    marginTop: hp("1%"),
    fontSize: wp("3.5%"),
    fontWeight: "600",
  },
})
