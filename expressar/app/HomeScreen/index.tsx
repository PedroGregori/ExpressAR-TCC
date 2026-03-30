import useHomeScreenModel from "./model"
import HomeScreenView from "./view";


export default function HomeScreen() {
  const homeModel = useHomeScreenModel();

  return (
    <HomeScreenView
       {...homeModel}
    />
  )
}

