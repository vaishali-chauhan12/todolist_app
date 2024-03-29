import Header from "../header"
import Sidebar from "../sidebar"
import Footer from "../footer"
import "./index.scss"

const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Wrapper
