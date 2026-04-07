import useClassCodeModel from "./model";
import ClassCodeView from "./view";

export default function ClassCodeScreen() {
  const ClassModel = useClassCodeModel();

  return (
    <ClassCodeView {...ClassModel}/>
  )
}

