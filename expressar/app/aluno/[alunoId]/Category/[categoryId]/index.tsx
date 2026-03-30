import useCategoryDetail from "./model";
import CategoryDetailView from "./view";

export default function CategoryScreen() {
  const CategoryDetail = useCategoryDetail();

  return (
    <CategoryDetailView {...CategoryDetail}/>
  )
}

