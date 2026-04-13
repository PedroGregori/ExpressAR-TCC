import CriarCartaoView from "./view"
import useCriarCartaoModel from "./model"

export default function CriarCartaoViewModel() {
  const model = useCriarCartaoModel()

  return <CriarCartaoView {...model} />
}
