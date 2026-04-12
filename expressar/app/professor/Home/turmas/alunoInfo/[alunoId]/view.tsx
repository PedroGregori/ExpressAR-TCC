import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useAlunoModel from "./model"

export default function AlunoView({
  nome,
  aluno,
  loading,
  handleLogout,
  verRelatorio,
  editarAluno,
  removerAluno,
}: ReturnType<typeof useAlunoModel>) {
  if (loading) return <ActivityIndicator size="large" />

  if (!aluno) return <Text>Aluno não encontrado</Text>

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6CC24A" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 30 }}>👩</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.welcome}>Bem vindo(a):</Text>
          <Text style={styles.name}>{nome}</Text>
        </View>

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.title}>Gerenciar aluno</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{aluno.nome}</Text>
          <Text style={styles.cardSubtitle}>
            {aluno.idade} anos · {aluno.sexo}
          </Text>
          <Text style={styles.cardCode}>Código: {aluno.codigo}</Text>
        </View>

        {/* Botões */}
        <TouchableOpacity style={[styles.button, styles.blue]} onPress={verRelatorio}>
          <Text style={styles.buttonText}>Ver relatório</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.yellow]} onPress={editarAluno}>
          <Text style={styles.buttonText}>Editar aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.red]} onPress={removerAluno}>
          <Text style={styles.buttonText}>Remover aluno</Text>
        </TouchableOpacity>
      </View>
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

  avatar: {
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

  content: { flex: 1, padding: wp("5%") },
  title: { fontSize: wp("6%"), fontWeight: "bold", color: "#2E7D32", marginBottom: hp("2%") },

  card: {
    backgroundColor: "#fff",
    padding: wp("4%"),
    borderRadius: wp("4%"),
    marginBottom: hp("2%"),
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: { fontSize: wp("5%"), fontWeight: "bold" },
  cardSubtitle: { color: "#777", fontSize: wp("4%") },
  cardCode: { color: "#555", fontSize: wp("3.5%"), marginTop: hp("0.5%") },

  button: {
    paddingVertical: hp("1.8%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: wp("4%") },

  blue: { backgroundColor: "#007bff" },
  yellow: { backgroundColor: "#ffc107" },
  red: { backgroundColor: "#dc3545" },
})
