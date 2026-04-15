import CategoriasTurmaView from "./view"
import useCategoriasTurmaModel from "./model"

export default function CategoriasTurmaViewModel() {
  const model = useCategoriasTurmaModel()

  return <CategoriasTurmaView {...model} />
}