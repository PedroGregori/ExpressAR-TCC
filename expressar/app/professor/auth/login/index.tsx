import useLoginModel from './model'
import LoginView from './view'

export default function LoginScreen() {
  const loginModel = useLoginModel()

  return (
  <LoginView {...loginModel} />
  )
}