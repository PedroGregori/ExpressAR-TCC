import ManageCategoryView from "./view"
import useManageCategoryModel from "./model"

export default function ManageCategoryViewModel() {
  const model = useManageCategoryModel()

  return <ManageCategoryView {...model} />
}