import { useCallback, useEffect, useState } from "react";
import {
  CHeader,
  CNavbarBrand,
  CForm
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilTask } from "@coreui/icons";
import { useSelector } from "react-redux";
import Notifications from "../notifications";
import { getNotifications } from "../../services/task";
import "./index.scss";
import Avatar from "./avatar";

const Header = () => {
  const [allNotifications, setNotifications] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.authUser.data);

  const fetchNotifications = useCallback(() => {
    (async function () {
      try {
        const notificationsResponse = await getNotifications();
        setNotifications(notificationsResponse.resultObj);
      } catch (error) {
        console.error("getNotifications", error);
      }
    })();
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <>
      <CHeader expand="lg" className="header-wrapper">
        <CNavbarBrand href="#" className="header-left">
          <CIcon className="text-success" icon={cilTask} size="lg" />
          <span>To Do App</span>
        </CNavbarBrand>
        {isLoggedIn && (
          <div className="header-right">
            <CForm className="d-flex">
              {/* <CInputGroup>
                <CFormInput
                  type="search"
                  className="me-2"
                  placeholder="Search"
                />
              </CInputGroup> */}
            </CForm>
            <div className="header-right-icons">
              <Notifications allNotifications={allNotifications} />
              <Avatar />
            </div>
          </div>
        )}
      </CHeader>
    </>
  );
};

export default Header;
