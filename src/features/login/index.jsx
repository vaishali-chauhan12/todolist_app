import LoginForm from "../../components/login-form"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { loginUser } from "../../store/user-profile"

const Login = () => {
  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn)
  const dispatch = useDispatch()

  const onSubmit = (loginData) => {
    dispatch(loginUser(loginData))
  }
  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return <LoginForm onSubmit={onSubmit} />
}

export default Login
