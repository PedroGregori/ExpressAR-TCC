import useAddTurmaModel from "./model"
import AddTurmaView from "./view"

export default function AddTurmaScreen() {
  const model = useAddTurmaModel()
  
  return <AddTurmaView {...model} />
}
