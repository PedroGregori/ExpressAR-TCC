import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

type Props = {
  nome: string
  onAction?: () => void

  backgroundColor?: string
  actionText?: string
  subtitle?: string
  showAction?: boolean
  emoji?: string // 🔥 NOVA PROP
}

export default function UserHeader({
  nome,
  onAction,
  backgroundColor = "#F4B544",
  actionText = "Sair",
  subtitle = "Bem vindo(a):",
  showAction = true,
  emoji = "👤", // 🔥 default
}: Props) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      
      {/* ESQUERDA */}
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>{emoji}</Text>
        </View>

        <View>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.name}>{nome}</Text>
        </View>
      </View>

      {/* DIREITA */}
      {showAction && (
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onAction}
          activeOpacity={0.85}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("6.5%"), // 🔥 leve ajuste pra descer tudo
    paddingBottom: hp("3%"),
    paddingHorizontal: wp("4%"),
    borderBottomLeftRadius: wp("6%"),
    borderBottomRightRadius: wp("6%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("12.5%"),
    backgroundColor: "#F7F3E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },

  avatarEmoji: {
    fontSize: wp("10%"),
  },

  subtitle: {
    color: "#FFF7E2",
    fontSize: wp("3.2%"),
    fontWeight: "600",
  },

  name: {
    color: "#FFFFFF",
    fontSize: wp("6%"),
    fontWeight: "800",
  },

  actionBtn: {
    backgroundColor: "rgba(255,255,255,0.35)",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1%"),
    borderRadius: wp("3%"),
  },

  actionText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: wp("3.6%"),
  },
})