import CriarSubcategoriaView from "./view"
import useCriarSubcategoriaModel from "./model"

export default function CriarSubcategoriaPage() {
  const model = useCriarSubcategoriaModel()

  return <CriarSubcategoriaView {...model} />
}