import CIcon from "@coreui/icons-react"
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react"
import { cilOptions } from "@coreui/icons"

const EditOptions = ({onEdit, onDelete, id, iconSize="xl", toggleSize="sm", className=""}) => {
    return (
    <CDropdown variant="btn-group">
      <CDropdownToggle color="secondary" size={toggleSize} className={className}>
        <CIcon icon={cilOptions} size={iconSize} />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem href="#!" onClick={() => onEdit(true)}>
          Edit
        </CDropdownItem>
        <CDropdownItem href="#!" onClick={() => onDelete(id)}>
          Delete
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default EditOptions;
