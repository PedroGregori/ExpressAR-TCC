import PesquisarImagemView from "./view"
import usePesquisarImagemModel from "./model"

export default function PesquisarImagemViewModel() {
  const model = usePesquisarImagemModel()

  return <PesquisarImagemView {...model} />
}