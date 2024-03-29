import { useDispatch } from "react-redux"
import SignUpForm from "../../components/sign-up-form"
import { signUpUser } from "../../services/auth"

const SignUp = () => {
  const onSubmit = (data) => {
    signUpUser(data)
      .then((response) => {
        console.error("success", response)
      })
      .catch((error) => {
        console.error("catch", error)
      })
  }
  return <SignUpForm onSubmit={onSubmit} />
}

export default SignUp
