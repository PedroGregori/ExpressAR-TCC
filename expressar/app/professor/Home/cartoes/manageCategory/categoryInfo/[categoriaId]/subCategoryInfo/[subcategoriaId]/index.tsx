import ManageSubCategoryView from "./view"
import useManageSubCategoryModel from "./model"

export default function ManageSubCategoryScreen() {
  const model = useManageSubCategoryModel()

  return <ManageSubCategoryView {...model} />
}