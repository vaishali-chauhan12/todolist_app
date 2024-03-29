import { CSidebar, CSidebarNav, CNavTitle, CNavItem } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilList } from "@coreui/icons"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateListCollection } from "../../store/list"
import { useNavigate } from "react-router-dom"
import "./index.scss"

const Sidebar = () => {
  const userId = useSelector((state) => state.authUser.userId)
  const { allLists } = useSelector((state) => state.listCollection.data)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateListCollection({ userId }))
  }, [])

  const sidebarStyles = {
    "--cui-sidebar-bg": "transparent",
    "--cui-sidebar-color": "#000000",
  }

  const navbarStyles = {
    "--cui-sidebar-nav-link-color": "#000000",
    "--cui-sidebar-nav-title-color": "#000000",
    "--cui-sidebar-nav-link-icon-color": "#000000",
    "--cui-sidebar-nav-link-hover-color": "#000000",
    "--cui-sidebar-nav-link-hover-icon-color": "#000000",
    "--cui-sidebar-nav-link-hover-bg": "#ffffff",
  }

  return (
    <CSidebar style={sidebarStyles}>
      <CSidebarNav style={navbarStyles}>
        <CNavItem
          className="sidebar-nav-item"
          // key={list.id}
          href="#"
          onClick={() => navigate(`/`)}
        >
          {/* <CIcon customClassName="nav-icon" icon={cilList} /> */}
          Today
        </CNavItem>
        <CNavTitle>Lists</CNavTitle>
        {allLists.map((list) => (
          <CNavItem
            className="sidebar-nav-item"
            key={list.id}
            href="#"
            onClick={() => navigate(`/list/${list.id}`)}
          >
            <CIcon customClassName="nav-icon" icon={cilList} />
            {list.title}
          </CNavItem>
        ))}
      </CSidebarNav>
    </CSidebar>
  )
}

export default Sidebar
