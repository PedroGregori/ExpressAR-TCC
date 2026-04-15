import ManageSubCategoryView from "./view"
import useManageSubCategoryModel from "./model"

export default function ManageSubCategoryViewModel() {
  const model = useManageSubCategoryModel()

  return <ManageSubCategoryView {...model} />
}