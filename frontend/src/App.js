import { useSelector } from "react-redux";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutesSwitch from "./routes";
import Wrapper from "./components/wrapper";
import AuthWrapper from "./components/auth-wrapper";
import "./styles/main.scss";

function App() {
  const isLoggedIn = useSelector((state) => state.authUser.data.isLoggedIn);
  
  return (
    <div className="App">
      {!isLoggedIn ? (
        <AuthWrapper>
          <RoutesSwitch />
        </AuthWrapper>
      ) : (
        <Wrapper>
          <RoutesSwitch />
        </Wrapper>
      )}
    </div>
  );
}

export default App;
