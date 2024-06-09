import { cilBell } from "@coreui/icons";

import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownItemPlain,
} from "@coreui/react";
import { useSelector } from "react-redux";
import CIcon from "@coreui/icons-react";
import Label from "../label";
import { useNavigate } from "react-router-dom"
import { truncateString } from "../../utils";
import "./index.scss";

const Notifications = (props) => {
  const navigate = useNavigate()
  const defaultList = useSelector(
    (state) => state.listCollection.data.defaultList
  );
  const { allNotifications } = props;

  const navigateToList = (notification) => {
    if(defaultList.id === notification.listId){
      navigate('/')
    } else {
      navigate(`/list/${notification.listId}`)
    }
  }
  return (
    <CDropdown variant="btn-group" className="notification-wrapper">
      <CDropdownToggle
        color="secondary"
        size="sm"
        className="notification-icon"
      >
        <CIcon icon={cilBell} size="lg" />
        {allNotifications.length > 0 && (
          <div className="notification-badge">{allNotifications.length}</div>
        )}
      </CDropdownToggle>
      <CDropdownMenu className="notification-list">
        <CDropdownItemPlain className="notification-label">
          Tasks Due Today
        </CDropdownItemPlain>
        {allNotifications.map((notification, index) => (
          <CDropdownItem key={index} className="notification-item" onClick={navigateToList.bind(this, notification)}>
            <div>Task {truncateString(notification.taskTitle)}</div>
            <Label text={notification.listTitle} />
          </CDropdownItem>
        ))}
        {allNotifications.length === 0 && (
          <CDropdownItem className="no-notification">
            No Tasks Due for today
          </CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default Notifications;
