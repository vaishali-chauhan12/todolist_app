import { useSelector } from "react-redux"
import "@coreui/coreui/dist/css/coreui.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import RoutesSwitch from "./routes"
import Wrapper from "./components/wrapper"
import "./styles/main.scss"

function App() {
  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn)

  return (
    <div className="App">
      {!isLoggedIn ? (
        <RoutesSwitch />
      ) : (
        <Wrapper>
          <RoutesSwitch />
        </Wrapper>
      )}
    </div>
  )
}

export default App
