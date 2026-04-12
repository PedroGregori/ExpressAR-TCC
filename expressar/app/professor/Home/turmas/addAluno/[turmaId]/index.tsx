import useAddAlunoModel from "./model";
import AddAlunoView from "./view";

export default function AddAlunoScreen() {
  
  const AddAlunoModel = useAddAlunoModel()

  return <AddAlunoView {...AddAlunoModel} />
}
