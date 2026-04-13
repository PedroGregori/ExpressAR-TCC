import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useInfoModel from "./model"

export default function InfoView({
  nomeProfessor,
  turmaNome,
  alunos,
  handleLogout,
  goAdicionarAluno,
  goGerenciarAluno,
}: ReturnType<typeof useInfoModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6CC24A" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 30 }}>👨</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcome}>Bem vindo(a):</Text>
          <Text style={styles.name}>{nomeProfessor}</Text>
        </View>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.title}>
          {turmaNome ? turmaNome.toUpperCase() : "Carregando..."}
        </Text>

        <Text style={styles.subtitle}>
          Gerencie os alunos cadastrados na turma
        </Text>

        {alunos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum aluno cadastrado ainda.</Text>
        ) : (
          <FlatList
            data={alunos}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => goGerenciarAluno(item.codigo)} // ✅ passa o código
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.nome}</Text>
                  <Text style={styles.cardSubtitle}>
                    {item.idade} anos · {item.sexo}
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp("8%") }}
          />
        )}
      </View>

      {/* BOTÃO FIXO */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={goAdicionarAluno}>
          <Text style={styles.addText}>Adicionar aluno</Text>
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
  title: { fontSize: wp("6%"), fontWeight: "bold", color: "#2E7D32", marginBottom: hp("1%") },
  subtitle: { color: "#6B8E6B", marginBottom: hp("2%") },
  emptyText: { textAlign: "center", marginTop: hp("2%"), color: "#777", fontSize: wp("4%") },
  card: {
    backgroundColor: "#fff",
    padding: wp("4%"),
    borderRadius: wp("4%"),
    marginBottom: hp("1.5%"),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: { fontSize: wp("4%"), fontWeight: "bold" },
  cardSubtitle: { color: "#777", fontSize: wp("3%") },
  arrow: { fontSize: wp("6%"), color: "#000", marginLeft: wp("2%") },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, padding: wp("5%"), backgroundColor: "#DDE6D5" },
  addButton: {
    backgroundColor: "#8ED973",
    height: hp("6%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  addText: { color: "#fff", fontWeight: "bold", fontSize: wp("4%") },
})
