import RelatorioAlunoView from "./view"
import useRelatorioAlunoModel from "./model"

export default function RelatorioAlunoScreen() {
  const model = useRelatorioAlunoModel()

  return <RelatorioAlunoView {...model} />
}