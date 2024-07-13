import { CSidebar, CSidebarNav, CNavTitle, CNavItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilList } from "@coreui/icons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateListCollection } from "../../store/list";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Sidebar = () => {
  const userId = useSelector((state) => state.authUser.data.userId);
  const { allLists, activeListId } = useSelector(
    (state) => state.listCollection.data
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateListCollection({ userId }));
  }, [dispatch, userId]);

  const sidebarStyles = {
    "--cui-sidebar-bg": "transparent",
    "--cui-sidebar-color": "#000000",
  };

  const navbarStyles = {
    "--cui-sidebar-nav-link-color": "#000000",
    "--cui-sidebar-nav-title-color": "#000000",
    "--cui-sidebar-nav-link-icon-color": "#000000",
    "--cui-sidebar-nav-link-hover-color": "#000000",
    "--cui-sidebar-nav-link-hover-icon-color": "#000000",
    "--cui-sidebar-nav-link-hover-bg": "#ffffff",
    "--cui-sidebar-nav-link-active-color": "#000000",
    "--cui-sidebar-nav-link-active-icon-color": "#000000",
    "--cui-sidebar-nav-link-active-bg": "#ffffff",
    "--cui-sidebar-nav-link-actice-bg": "#ffffff",
  };

  return (
    <CSidebar style={sidebarStyles}>
      <CSidebarNav style={navbarStyles}>
        <CNavItem
          className={`sidebar-nav-item${activeListId == null ? " active" : ""}`}
          href="#"
          onClick={() => navigate(`/`)}
        >
          Home
        </CNavItem>
        {allLists.length > 0 && <CNavTitle>Lists</CNavTitle>}
        {allLists.map((list, index) => (
          <CNavItem
            className={`sidebar-nav-item${activeListId == list.id ? " active" : ""}`}
            key={list.id}
            href="#"
            onClick={() => navigate(`/list/${list.id}`)}
            data-testid={`list-nav-item-${index}`}
          >
            <CIcon customClassName="nav-icon" icon={cilList} />
            {list.title}
          </CNavItem>
        ))}
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
