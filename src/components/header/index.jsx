import {
  CHeader,
  CContainer,
  CNavbarBrand,
  CForm,
  CFormInput,
  CAvatar,
  CInputGroup,
} from "@coreui/react";
import Button from "../button";
import CIcon from "@coreui/icons-react";
import { cilTask } from "@coreui/icons";
import { useSelector } from "react-redux";
import Notifications from "../notifications";
import "./index.scss";

const Header = () => {
  const username = useSelector((state) => state.authUser.username);

  return (
    <>
      <CHeader expand="lg" className="header-wrapper">
        <CNavbarBrand href="#" className="header-left">
          <CIcon icon={cilTask} size="lg" />
          <span>To Do App</span>
        </CNavbarBrand>
        <div className="header-right">
          <CForm className="d-flex">
            <CInputGroup>
              <CFormInput type="search" className="me-2" placeholder="Search" />
            </CInputGroup>
          </CForm>
          <div className="header-right-icons">
            <Notifications />
            <CAvatar
              color="secondary"
              textColor="white"
              style={{ "text-transform": "capitalize" }}
            >
              {username[0]}
            </CAvatar>
          </div>
          {/* <Notifications /> */}
        </div>
      </CHeader>
    </>
  );
};

export default Header;
