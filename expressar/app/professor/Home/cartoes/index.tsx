import SelecionarTurmaView from "./view"
import useSelecionarTurmaModel from "./model"

export default function SelecionarTurmaViewModel() {
  const model = useSelecionarTurmaModel()

  return <SelecionarTurmaView {...model} />
}