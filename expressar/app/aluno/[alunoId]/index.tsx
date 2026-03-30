import useCategoryModel from "./Category/model";
import CategoryView from "./Category/view";

export default function CategoryScreen() {
  const CategoryModel = useCategoryModel();

  return (
    <CategoryView {...CategoryModel}/>
  )
}

