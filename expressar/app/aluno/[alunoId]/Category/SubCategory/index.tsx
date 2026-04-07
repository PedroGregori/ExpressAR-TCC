import useSubCategoryModel from "./model";
import SubCategoryView from "./view";

export default function SubCategoryScreen() {
  const SubCategory = useSubCategoryModel();

  return (
    <SubCategoryView {...SubCategory}/>
  )
}

