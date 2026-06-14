import RelatorioTurmaView from "./view"
import useRelatorioTurmaModel from "./model"

export default function RelatorioTurmaScreen() {
  const model = useRelatorioTurmaModel()

  return <RelatorioTurmaView {...model} />
}