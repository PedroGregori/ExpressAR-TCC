import CriarCategoriaView from "./view"
import useCriarCategoriaModel from "./model"

export default function CriarCategoriaViewModel() {
  const model = useCriarCategoriaModel()

  return <CriarCategoriaView {...model} />
}