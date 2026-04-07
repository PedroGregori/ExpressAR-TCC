import useCategoryModel from "./model";
import CategoryView from "./view";

export default function CategoryScreen() {
  const CategoryModel = useCategoryModel();

  return (
    <CategoryView {...CategoryModel}/>
  )
}

