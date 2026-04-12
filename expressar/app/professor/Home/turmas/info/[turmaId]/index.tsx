import useInfoModel from "./model"
import InfoView from "./view"

export default function InfoScreen() {
  const model = useInfoModel()
  return <InfoView {...model} />
}
