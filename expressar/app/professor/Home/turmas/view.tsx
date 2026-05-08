import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  LayoutChangeEvent,
} from "react-native"
import { useState } from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import useTurmasModel from "./model"
import { logos, icons } from "@/assets/images"
import AppHeader from "@/components/AppHeader"

export default function TurmasView({
  turmas,
  goAdicionarTurma,
  goDetalharTurma,
  voltar,
}: ReturnType<typeof useTurmasModel>) {
  const [contentHeight, setContentHeight] = useState(0)
  const [listHeight, setListHeight] = useState(0)

  const showFixedButton = contentHeight > listHeight && listHeight > 0

  function renderTurmaCard(item: (typeof turmas)[number]) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => goDetalharTurma(item.id)}
        activeOpacity={0.85}
      >
        <View style={styles.cardLeft}>
          <Image
            source={icons.blackboard}
            style={styles.icon}
          />

          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.nome}</Text>

            <Text style={styles.cardSubtitle}>
              {item.qtd_alunos} alunos · {item.turno}
            </Text>
          </View>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    )
  }

  function FooterButton() {
    return (
      <TouchableOpacity
        style={styles.addButton}
        onPress={goAdicionarTurma}
        activeOpacity={0.85}
      >
        <Text style={styles.addText}>Adicionar turma</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#8ED55F" />

      <AppHeader
        title="Turmas"
        titleColor="#47892A"
        onBack={voltar}
        backgroundColor="#6BBA49"
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Gerencie suas turmas cadastradas
        </Text>

        <View
          style={styles.listContainer}
          onLayout={(e: LayoutChangeEvent) =>
            setListHeight(e.nativeEvent.layout.height)
          }
        >
          <FlatList
            data={turmas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderTurmaCard(item)}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={(_, height) =>
              setContentHeight(height)
            }
            contentContainerStyle={[
              styles.listContent,
              showFixedButton && {
                paddingBottom: hp("12%"),
              },
            ]}
            ListFooterComponent={
              !showFixedButton ? <FooterButton /> : null
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Nenhuma turma cadastrada.
                </Text>

                {!showFixedButton && <FooterButton />}
              </View>
            }
          />
        </View>
      </View>

      {showFixedButton && (
        <View style={styles.fixedFooter}>
          <FooterButton />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0E2",
  },

  content: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
  },

  subtitle: {
    fontSize: wp("4%"),
    color: "#6B6B6B",
    marginBottom: hp("1.8%"),
  },

  listContainer: {
    flex: 1,
  },

  listContent: {
    paddingBottom: hp("3%"),
  },

  card: {
    backgroundColor: "#F7F5EF",
    borderRadius: wp("5%"),
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("4%"),
    marginBottom: hp("1.8%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    width: wp("10%"),
    height: wp("10%"),
    resizeMode: "contain",
    marginRight: hp("1.5%"),
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: wp("4.3%"),
    fontWeight: "700",
    color: "#4F4F4F",
    marginBottom: hp("0.2%"),
  },

  cardSubtitle: {
    fontSize: wp("3.3%"),
    color: "#666666",
  },

  arrow: {
    fontSize: wp("7%"),
    color: "#555",
    marginLeft: wp("2%"),
  },

  addButton: {
    backgroundColor: "#A8FF82CC",
    borderRadius: wp("5%"),
    minHeight: hp("6%"),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("1.6%"),
    borderBottomWidth: 3,
    borderBottomColor: "#6BBA49",
  },

  addText: {
    fontSize: wp("4.3%"),
    fontWeight: "700",
    color: "#6BBA49",
  },

  fixedFooter: {
    position: "absolute",
    left: wp("5%"),
    right: wp("5%"),
    bottom: hp("3%"),
  },

  emptyContainer: {
    paddingTop: hp("2%"),
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    fontSize: wp("4%"),
    marginBottom: hp("2%"),
  },
})