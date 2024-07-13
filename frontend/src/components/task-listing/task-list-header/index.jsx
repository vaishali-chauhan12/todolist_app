import { CNav, CNavItem, CNavLink } from "@coreui/react"
import { TASK_STATUS_NAV_MENU } from "../../../constants"
import "./index.scss"

const TaskListHeader = ({ activeTab, setActiveTab }) => {
  const styles = {
    "--bs-nav-pills-link-active-bg": "#3c4b64",
    "--bs-nav-link-color": "#3c4b64",
    "--bs-nav-link-hover-color": "#3c4b64",
  }

  return (
    <CNav
      variant="pills"
      role="tablist"
      className="task-nav-tabs"
      style={styles}
    >
      <CNavItem>
        <CNavLink
          href="#!"
          active={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >
          {TASK_STATUS_NAV_MENU.ALL}
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#!"
          active={activeTab === 2}
          onClick={() => setActiveTab(2)}
        >
          {TASK_STATUS_NAV_MENU.PENDING}
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#!"
          active={activeTab === 3}
          onClick={() => setActiveTab(3)}
        >
          {TASK_STATUS_NAV_MENU.COMPLETED}
        </CNavLink>
      </CNavItem>
    </CNav>
  )
}

export default TaskListHeader
