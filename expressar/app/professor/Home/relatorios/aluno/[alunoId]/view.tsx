import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import AppHeader from "@/components/AppHeader"
import { icons } from "@/assets/images"
import useRelatorioAlunoModel from "./model"

export default function RelatorioAlunoView({
  nomeAluno,
  idade,
  sexo,
  loading,
  totalInteracoes,
  diasAtivos,
  categoriaMaisUsada,
  categoriasRanking,
  cartoesRanking,
  voltar,
}: ReturnType<typeof useRelatorioAlunoModel>) {
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

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#5B9BD5" />
          <Text style={styles.loadingText}>Gerando relatório...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {sexo === "Feminino" ? "👧" : "👦"}
              </Text>
            </View>

            <View>
              <Text style={styles.name}>{nomeAluno}</Text>
              <Text style={styles.subtitle}>
                {idade} anos • {sexo}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Resumo semanal</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalInteracoes}</Text>
              <Text style={styles.statLabel}>Interações</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{diasAtivos}</Text>
              <Text style={styles.statLabel}>Dias ativos</Text>
            </View>
          </View>

          <View style={styles.highlightCard}>
            <Text style={styles.highlightLabel}>Categoria mais usada</Text>
            <Text style={styles.highlightTitle}>
              {categoriaMaisUsada?.nome ?? "Sem dados"}
            </Text>
            <Text style={styles.highlightSubtitle}>
              {categoriaMaisUsada
                ? `${categoriaMaisUsada.total} interações`
                : "Nenhuma interação registrada"}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Ranking de categorias</Text>

          {categoriasRanking.map((categoria, index) => (
            <View key={categoria.id} style={styles.rankingCard}>
              <Text style={styles.position}>{index + 1}º</Text>

              <View style={styles.rankingInfo}>
                <Text style={styles.rankingTitle}>{categoria.nome}</Text>
                <Text style={styles.rankingSubtitle}>
                  {categoria.total} usos
                </Text>
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Cartões mais usados</Text>

          {cartoesRanking.map((cartao, index) => (
            <View key={cartao.id} style={styles.cardItem}>
              <Text style={styles.position}>{index + 1}º</Text>

              {cartao.imagem ? (
                <Image source={{ uri: cartao.imagem }} style={styles.cardImage} />
              ) : (
                <Text style={styles.fallback}>🃏</Text>
              )}

              <View style={styles.rankingInfo}>
                <Text style={styles.rankingTitle}>{cartao.nome}</Text>
                <Text style={styles.rankingSubtitle}>{cartao.total} usos</Text>
              </View>
            </View>
          ))}

          {totalInteracoes === 0 && (
            <Text style={styles.emptyText}>
              Ainda não existem interações registradas para este aluno.
            </Text>
          )}
        </ScrollView>
      )}
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

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: wp("5%"),
    padding: wp("4%"),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },

  avatar: {
    width: wp("16%"),
    height: wp("16%"),
    borderRadius: wp("8%"),
    backgroundColor: "#DCEFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },

  avatarText: {
    fontSize: wp("9%"),
  },

  name: {
    fontSize: wp("5%"),
    fontWeight: "800",
    color: "#333",
  },

  subtitle: {
    marginTop: hp("0.4%"),
    fontSize: wp("3.5%"),
    color: "#666",
  },

  sectionTitle: {
    fontSize: wp("4.2%"),
    fontWeight: "800",
    color: "#215C91",
    marginBottom: hp("1%"),
    marginTop: hp("1%"),
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1.5%"),
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: wp("4%"),
    paddingVertical: hp("2%"),
    alignItems: "center",
  },

  statNumber: {
    fontSize: wp("7%"),
    fontWeight: "800",
    color: "#215C91",
  },

  statLabel: {
    fontSize: wp("3.3%"),
    color: "#666",
    marginTop: hp("0.4%"),
  },

  highlightCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: wp("4%"),
    padding: wp("4%"),
    marginBottom: hp("1.5%"),
  },

  highlightLabel: {
    fontSize: wp("3.4%"),
    color: "#666",
  },

  highlightTitle: {
    fontSize: wp("5%"),
    color: "#215C91",
    fontWeight: "800",
    marginTop: hp("0.5%"),
  },

  highlightSubtitle: {
    fontSize: wp("3.4%"),
    color: "#666",
    marginTop: hp("0.4%"),
  },

  rankingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: wp("4%"),
    padding: wp("3.5%"),
    marginBottom: hp("1%"),
    flexDirection: "row",
    alignItems: "center",
  },

  cardItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: wp("4%"),
    padding: wp("3%"),
    marginBottom: hp("1%"),
    flexDirection: "row",
    alignItems: "center",
  },

  position: {
    width: wp("9%"),
    fontSize: wp("4%"),
    fontWeight: "800",
    color: "#215C91",
  },

  rankingInfo: {
    flex: 1,
  },

  rankingTitle: {
    fontSize: wp("4%"),
    fontWeight: "700",
    color: "#333",
  },

  rankingSubtitle: {
    fontSize: wp("3.2%"),
    color: "#666",
    marginTop: hp("0.3%"),
  },

  cardImage: {
    width: wp("11%"),
    height: wp("11%"),
    resizeMode: "contain",
    marginRight: wp("3%"),
  },

  fallback: {
    fontSize: wp("8%"),
    marginRight: wp("3%"),
  },

  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: wp("3.7%"),
    marginTop: hp("2%"),
    marginBottom: hp("4%"),
  },
})