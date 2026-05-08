import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useInfoModel from "./model"
import AppHeader from "@/components/AppHeader"
import { avatar } from "@/assets/images"

export default function InfoView({
  turmaNome,
  alunos,
  handleLogout,
  goAdicionarAluno,
  goGerenciarAluno,
  voltar,
}: ReturnType<typeof useInfoModel>) {

  function renderAlunoAvatar(sexo?: string) {
    const masculino =
      sexo?.toLowerCase().includes("masc") ||
      sexo?.toLowerCase() === "menino"

    const avatarImage = masculino
      ? avatar.aluno
      : avatar.aluna

    return (
      <View style={styles.avatarCircle}>
        <Image
          source={avatarImage}
          style={styles.avatar}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6CC24A" />

      <AppHeader
        title={turmaNome}
        titleColor="#47892A"
        onBack={voltar}
        backgroundColor="#6BBA49"
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Gerencie os alunos cadastrados na turma
        </Text>

        {alunos.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhum aluno cadastrado ainda.
          </Text>
        ) : (
          <FlatList
            data={alunos}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => goGerenciarAluno(item.codigo)}
                activeOpacity={0.85}
              >
                <View style={styles.cardLeft}>
                  {renderAlunoAvatar(item.sexo)}

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>
                      {item.nome}
                    </Text>

                    <Text style={styles.cardSubtitle}>
                      {item.idade} anos · {item.sexo}
                    </Text>
                  </View>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: hp("10%"),
            }}
          />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={goAdicionarAluno}
          activeOpacity={0.85}
        >
          <Text style={styles.addText}>
            Adicionar aluno
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDE6D5",
  },

  content: {
    flex: 1,
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
  },

  subtitle: {
    fontSize: wp("4%"),
    color: "#5F5F5F",
    marginBottom: hp("2%"),
  },

  emptyText: {
    textAlign: "center",
    marginTop: hp("2%"),
    color: "#777",
    fontSize: wp("4%"),
  },

  card: {
    backgroundColor: "#F7F5F6",
    paddingVertical: hp("1.6%"),
    paddingHorizontal: wp("3.5%"),
    borderRadius: wp("5%"),
    marginBottom: hp("1.8%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatarCircle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },

  avatar: {
    width: wp("14%"),
    height: wp("14%"),
    resizeMode: "contain",
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: wp("4.1%"),
    fontWeight: "700",
    color: "#3F3F3F",
    marginBottom: hp("0.2%"),
  },

  cardSubtitle: {
    color: "#666",
    fontSize: wp("3.2%"),
  },

  arrow: {
    fontSize: wp("7%"),
    color: "#555",
    marginLeft: wp("2%"),
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("3%"),
    backgroundColor: "#DDE6D5",
  },

  addButton: {
    backgroundColor: "#A8FF82CC",
    height: hp("6%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#6BBA49",
  },

  addText: {
    color: "#6BBA49",
    fontWeight: "700",
    fontSize: wp("4%"),
  },
})