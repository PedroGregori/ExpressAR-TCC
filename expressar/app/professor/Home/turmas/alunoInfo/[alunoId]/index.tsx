import useAlunoModel from "./model"
import AlunoView from "./view"

export default function AlunoScreen() {
  const model = useAlunoModel()
  return <AlunoView {...model} />
}
