import CIcon from "@coreui/icons-react"
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react"
import { cilOptions } from "@coreui/icons"

const ListHeader = (props) => {
  const { currentList, setIsEdit, onDelete } = props
  return (
    <div className="content-header">
      <div className="content-heading">
        <div className="content-mainheading">{currentList?.title}</div>
        <div className="content-subheading">{currentList?.note}</div>
      </div>
      <div className="content-header-options">
        <CDropdown variant="btn-group">
          <CDropdownToggle color="secondary" size="sm">
            <CIcon icon={cilOptions} size="xl" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem href="#!" onClick={() => setIsEdit(true)}>
              Edit
            </CDropdownItem>
            <CDropdownItem href="#!" onClick={() => onDelete(currentList?.id)}>
              Delete
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
    </div>
  )
}

export default ListHeader
