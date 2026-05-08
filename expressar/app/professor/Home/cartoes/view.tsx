import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useSelecionarTurmaModel from "./model"
import AppHeader from "@/components/AppHeader"
import { icons } from "@/assets/images"

export default function SelecionarTurmaView({
  turmas,
  selecionarTurma,
  voltar,
}: ReturnType<typeof useSelecionarTurmaModel>) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8C96E" />

      <AppHeader
        title="Criar cartões"
        onBack={voltar}
        backgroundColor="#E8C96E"
        titleColor="#6B5A2B"
        iconColor="#6B5A2B"
        backImg={icons.yback}
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>Escolha uma turma</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {turmas.map((turma) => (
            <TouchableOpacity
              key={turma.id}
              style={styles.card}
              onPress={() => selecionarTurma(turma.id, turma.nome)}
              activeOpacity={0.8}
            >
              <View style={styles.iconBox}>
                <Image
                  source={icons.blackboard}
                  style={styles.icon}
                />
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

  content: {
    flex: 1,
    padding: wp("4%"),
  },

  subtitle: {
    fontSize: wp("4%"),
    color: "#7A6A3A",
    marginBottom: hp("2%"),
  },

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
    width: wp("10%"),
    height: wp("10%"),
    resizeMode: "contain",
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