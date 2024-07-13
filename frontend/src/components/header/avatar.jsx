import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownItemPlain,
  CAvatar,
} from "@coreui/react";
import { authUser } from "../../store/user-profile";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

const Avatar = () => {
  const { username } = useSelector((state) => state.authUser.data);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logout = () => {
    dispatch(authUser.actions.logout());
    navigate('/signin')
  };

  return (
    <CDropdown variant="btn-group">
      <CDropdownToggle
        color="secondary"
        size="sm"
        className="profile-options-button"
      >
        <CAvatar
          color="secondary"
          textColor="white"
          style={{ "text-transform": "capitalize" }}
        >
          {username[0]}
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="profile-options">
        <CDropdownItemPlain className="profile-username">
          {username}
        </CDropdownItemPlain>
        <CDropdownItem onClick={logout}>Logout</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default Avatar;
