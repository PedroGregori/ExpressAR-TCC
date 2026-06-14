import RelatorioView from "./view"
import useRelatorioModel from "./model"

export default function RelatorioScreen() {
  const model = useRelatorioModel()

  return <RelatorioView {...model} />
}