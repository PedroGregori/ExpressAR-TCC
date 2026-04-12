import useTurmasModel from "./model"
import TurmasView from "./view"

export default function TurmasScreen() {
  const model = useTurmasModel()

  return <TurmasView {...model} />
}