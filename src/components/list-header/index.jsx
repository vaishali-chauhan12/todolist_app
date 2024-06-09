import EditOptions from "../edit-options"

const ListHeader = (props) => {
  const { currentList, setIsEdit, onDelete } = props

  return (
    <div className="content-header">
      <div className="content-heading">
        <div className="content-mainheading">{currentList?.title}</div>
        <div className="content-subheading">{currentList?.note}</div>
      </div>
      <div className="content-header-options">
        <EditOptions onEdit={setIsEdit} onDelete={onDelete} id={currentList?.id}/>
      </div>
    </div>
  )
}

export default ListHeader
