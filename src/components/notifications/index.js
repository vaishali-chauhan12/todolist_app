import { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../../services/task";
import { cilBell } from "@coreui/icons";

import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownItemPlain,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Label from "../label";
import { truncateString } from "../../utils";
import "./index.scss";

const Notifications = () => {
  const [allNotifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(() => {
    (async function () {
      try {
        const notificationsResponse = await getNotifications();
        setNotifications(notificationsResponse.resultObj);
        console.error("allNotifications", notificationsResponse.resultObj);
      } catch (error) {
        console.error("getNotifications", error);
      }
    })();
  }, []);

  return (
    <CDropdown
      variant="btn-group"
      className="notification-wrapper"
      onShow={fetchNotifications}
    >
      <CDropdownToggle
        color="secondary"
        size="sm"
        className="notification-icon"
      >
        <CIcon icon={cilBell} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="notification-list">
        <CDropdownItemPlain className="notification-label">
          Tasks Due Today
        </CDropdownItemPlain>
        {allNotifications.map((notification, index) => (
          <CDropdownItem key={index} className="notification-item">
            <div>Task {truncateString(notification.taskTitle)}</div>
            <Label text={notification.listTitle} />
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default Notifications;
