import useCategoriasTurmaModel from "./model"
import CategoriasTurmaView from "./view"

export default function SelecionarTurmaViewModel() {
  const model = useCategoriasTurmaModel()

  return <CategoriasTurmaView {...model} />
}