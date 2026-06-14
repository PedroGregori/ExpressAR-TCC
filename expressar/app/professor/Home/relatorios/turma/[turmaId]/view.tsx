import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import AppHeader from "@/components/AppHeader"
import { icons } from "@/assets/images"
import useRelatorioTurmaModel from "./model"

export default function RelatorioTurmaView({
  nomeTurma,
  alunos,
  loading,
  voltar,
  irParaRelatorioAluno,
}: ReturnType<typeof useRelatorioTurmaModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7FB3E6" />

      <AppHeader
        title={nomeTurma || "Turma"}
        onBack={voltar}
        backgroundColor="#7FB3E6"
        titleColor="#215C91"
        iconColor="#215C91"
        backImg={icons.yback}
      />

      <View style={styles.content}>
        <Text style={styles.label}>Selecione o aluno</Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#5B9BD5" />
            <Text style={styles.loadingText}>Carregando alunos...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {alunos.map((aluno) => (
              <TouchableOpacity
                key={aluno.id}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() => irParaRelatorioAluno(aluno)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {aluno.sexo === "Feminino" ? "👧" : "👦"}
                  </Text>
                </View>

                <View style={styles.info}>
                  <Text style={styles.name}>{aluno.nome}</Text>
                  <Text style={styles.subtitle}>
                    {aluno.idade} anos • {aluno.sexo}
                  </Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}

            {!loading && alunos.length === 0 && (
              <Text style={styles.emptyText}>
                Nenhum aluno encontrado nessa turma.
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
  },

  content: {
    flex: 1,
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
  },

  label: {
    fontSize: wp("3.8%"),
    color: "#444",
    marginBottom: hp("1.5%"),
  },

  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: hp("1%"),
    color: "#215C91",
    fontSize: wp("3.8%"),
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: wp("4%"),
    padding: wp("3%"),
    marginBottom: hp("1.5%"),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  avatar: {
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("7%"),
    backgroundColor: "#DCEFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },

  avatarText: {
    fontSize: wp("8%"),
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: wp("4%"),
    fontWeight: "700",
    color: "#333",
  },

  subtitle: {
    marginTop: hp("0.4%"),
    fontSize: wp("3.1%"),
    color: "#666",
  },

  arrow: {
    fontSize: wp("8%"),
    color: "#444",
  },

  emptyText: {
    marginTop: hp("3%"),
    textAlign: "center",
    color: "#666",
    fontSize: wp("3.8%"),
  },
})