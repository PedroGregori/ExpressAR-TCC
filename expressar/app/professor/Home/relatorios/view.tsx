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

import AppHeader from "@/components/AppHeader"
import { icons } from "@/assets/images"
import useRelatorioModel from "./model"

export default function RelatorioView({
  turmas,
  loading,
  voltar,
  irParaTurma,
}: ReturnType<typeof useRelatorioModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7FB3E6" />

      <AppHeader
        title="Relatório"
        onBack={voltar}
        backgroundColor="#7FB3E6"
        titleColor="#215C91"
        iconColor="#215C91"
        backImg={icons.yback}
      />

      <View style={styles.content}>
        <Text style={styles.label}>Selecione a turma do aluno</Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#5B9BD5" />
            <Text style={styles.loadingText}>Carregando turmas...</Text>
          </View>
        ) : (
          turmas.map((turma) => (
            <TouchableOpacity
              key={turma.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => irParaTurma(turma)}
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>🧑‍🏫</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.title}>{turma.nome}</Text>
                <Text style={styles.subtitle}>
                  {turma.total_alunos} alunos • {turma.turno ?? "Sem turno"}
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))
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

  iconBox: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("3%"),
    backgroundColor: "#EAF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },

  icon: {
    fontSize: wp("7%"),
  },

  info: {
    flex: 1,
  },

  title: {
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
})