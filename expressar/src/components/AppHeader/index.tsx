import { icons } from "@/assets/images"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

type Props = {
  title: string
  onBack?: () => void
  onRightPress?: () => void
  rightContent?: React.ReactNode

  backgroundColor?: string
  titleColor?: string
  iconColor?: string
  backImg?: ImageSourcePropType
}

export default function AppHeader({
  title,
  onBack,
  onRightPress,
  rightContent,

  backgroundColor = "#6CC24A", // 🔥 verde padrão
  titleColor = "#FFFFFF",
  iconColor = "#5C7A35",
  backImg = icons.gback,
}: Props) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      {/* BOTÃO VOLTAR */}
      <TouchableOpacity onPress={onBack} style={styles.headerButton}>
        <Image source={backImg}></Image>
      </TouchableOpacity>

      {/* TÍTULO */}
      <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
        {title}
      </Text>

      {/* DIREITA */}
      <TouchableOpacity onPress={onRightPress} style={styles.headerButton}>
        {rightContent ? (
          rightContent
        ) : (
          <Text style={[styles.icon, { color: iconColor }]}>≡</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("6%"),
    paddingBottom: hp("2%"),
    paddingHorizontal: wp("4%"),
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: wp("6%"),
    borderBottomRightRadius: wp("6%"),
  },

  headerButton: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("4%"),
    backgroundColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: wp("6%"),
    fontWeight: "600",
  },

  title: {
    flex: 1,
    marginLeft: wp("4%"),
    fontSize: wp("5.8%"),
    fontWeight: "700",
  },
})