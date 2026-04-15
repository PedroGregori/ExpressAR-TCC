import EditAlunoView from "./view"
import useEditAlunoModel from "./model"

export default function EditAlunoViewModel() {
  const model = useEditAlunoModel()

  return <EditAlunoView {...model} />
}