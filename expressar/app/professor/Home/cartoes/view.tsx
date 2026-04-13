import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useSelecionarTurmaModel from "./model"

export default function SelecionarTurmaView({
  turmas,
  selecionarTurma,
  voltar,
}: ReturnType<typeof useSelecionarTurmaModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Criar cartões</Text>

        <Text style={styles.menu}>≡</Text>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Escolha uma turma</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {turmas.map((turma) => (
            <TouchableOpacity
              key={turma.id}
              style={styles.card}
              onPress={() => selecionarTurma(turma.id)}
              activeOpacity={0.8}
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>📚</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.nome}>{turma.nome}</Text>
                <Text style={styles.desc}>
                  {turma.alunos} Alunos • {turma.turno}
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E7C9",
  },

  /* HEADER */
  header: {
    backgroundColor: "#E8C96E",
    paddingTop: hp("6%"),
    paddingBottom: hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
  },
  back: {
    fontSize: wp("6%"),
    color: "#6B5A2B",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: "#6B5A2B",
  },
  menu: {
    fontSize: wp("6%"),
    color: "#6B5A2B",
  },

  /* CONTENT */
  content: {
    padding: wp("4%"),
  },
  subtitle: {
    fontSize: wp("4%"),
    color: "#7A6A3A",
    marginBottom: hp("2%"),
  },

  /* CARD */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F1E3",
    padding: wp("4%"),
    borderRadius: wp("4%"),
    marginBottom: hp("2%"),
  },

  iconBox: {
    marginRight: wp("3%"),
  },
  icon: {
    fontSize: wp("10%"),
  },

  info: {
    flex: 1,
  },
  nome: {
    fontSize: wp("4.2%"),
    fontWeight: "600",
    color: "#4A3F1D",
  },
  desc: {
    fontSize: wp("3.5%"),
    color: "#8C7A4A",
  },

  arrow: {
    fontSize: wp("6%"),
    color: "#8C7A4A",
  },
})