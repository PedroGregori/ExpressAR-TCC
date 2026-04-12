import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { useState } from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useAddAlunoModel from "./model"

export default function AddAlunoView({
  nome,
  idade,
  sexo,
  popup,
  setNome,
  setIdade,
  setSexo,
  salvarAluno,
  fecharPopup,
  verAluno,
  adicionarOutro,
  nomeProfessor, // vindo do model
  handleLogout,  // função de sair
}: ReturnType<typeof useAddAlunoModel>) {
  const [open, setOpen] = useState(false)

  const avatarEmoji = sexo === "Masculino" ? "👨" : sexo === "Feminino" ? "👩" : "🙂"

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6CC24A" />

      {/* HEADER igual ao InfoView */}
      <View style={styles.header}>
        <View style={styles.headerAvatar}>
          <Text style={{ fontSize: wp("8%") }}>👤</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcome}>Bem vindo(a):</Text>
          <Text style={styles.name}>{nomeProfessor}</Text>
        </View>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Adicionar aluno</Text>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{avatarEmoji}</Text>
        <Text style={styles.avatarText}>Selecione o avatar</Text>
      </View>

      {/* Campo Nome */}
      <Text style={styles.label}>Nome completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do aluno"
        value={nome}
        onChangeText={setNome}
      />

      {/* Campo Idade */}
      <Text style={styles.label}>Idade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      {/* Campo Gênero */}
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
        placeholderStyle={{ color: "#777" }}
        style={styles.input}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={fecharPopup}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.add]} onPress={salvarAluno}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* POPUP */}
      <Modal visible={!!popup} transparent animationType="fade">
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Aluno adicionado!</Text>
            {popup && (
              <>
                <Text style={styles.popupCode}>Código: {popup.codigo}</Text>
                <Text style={styles.popupName}>{popup.nome}</Text>
              </>
            )}
            <View style={styles.popupButtons}>
              <TouchableOpacity style={[styles.button, styles.add]} onPress={verAluno}>
                <Text style={styles.buttonText}>Ver aluno</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.outline]}
                onPress={adicionarOutro}
              >
                <Text style={styles.buttonText}>Adicionar outro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#DDE6D5" },

  header: {
    backgroundColor: "#6CC24A",
    height: hp("18%"),
    borderBottomLeftRadius: wp("6%"),
    borderBottomRightRadius: wp("6%"),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },
  
  headerAvatar: {
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("7%"),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },
  welcome: { color: "#fff", fontSize: wp("3.5%") },
  name: { color: "#fff", fontSize: wp("5%"), fontWeight: "bold" },
  logout: {
    backgroundColor: "#8ED973",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1%"),
    borderRadius: wp("3%"),
  },
  logoutText: { color: "#fff", fontWeight: "600" },

  title: { fontSize: wp("6%"), fontWeight: "bold", color: "#2E7D32", marginBottom: hp("2%") },

  avatarContainer: { alignItems: "center", marginBottom: hp("2%") },
  avatar: { fontSize: wp("20%") },
  avatarText: { fontSize: wp("4%"), color: "#2E7D32", fontWeight: "600" },

  label: { fontSize: wp("4%"), fontWeight: "600", marginTop: hp("2%"), color: "#2E7D32" },
  input: {
    backgroundColor: "#fff",
    padding: wp("4%"),
    borderRadius: wp("3%"),
    marginTop: hp("1%"),
    borderWidth: 2,
    borderColor: "#6CC24A",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#6CC24A",
  },

  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: hp("2%") },
  button: {
    flex: 1,
    marginHorizontal: wp("1%"),
    padding: wp("4%"),
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  cancel: { backgroundColor: "#E57373" },
  add: { backgroundColor: "#6CC24A" },
  outline: { borderWidth: 1, borderColor: "#6CC24A", backgroundColor: "transparent" },
  buttonText: { color: "#fff", fontWeight: "bold" },

  popupContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: wp("6%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    width: "80%",
  },
  popupTitle: { fontSize: wp("5%"), fontWeight: "bold", color: "#2E7D32", marginBottom: hp("1%") },
  popupCode: { fontSize: wp("4%"), fontWeight: "600", marginBottom: hp("0.5%") },
  popupName: { fontSize: wp("4%"), marginBottom: hp("2%") },
  popupButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
})
