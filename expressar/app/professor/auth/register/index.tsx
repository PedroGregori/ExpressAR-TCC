import useRegisterModel from './model'
import RegisterView from './view'

export default function RegisterScreen() {
  const registerModel = useRegisterModel()

  return <RegisterView {...registerModel} />
}