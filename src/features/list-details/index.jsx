import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import TaskListing from "../../components/task-listing"
import Modal from "../../components/modal"
import ListForm from "../../components/list-form"
import ListHeader from "../../components/list-header"
import "./index.scss"
import { updateList, deleteList } from "../../services/list"
import { listCollection } from "../../store/list"

const ListDetails = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { allLists } = useSelector((state) => state.listCollection.data)
  const currentList = allLists?.filter((list) => list.id == id)[0]

  const filterList = useCallback(
    (listId) => {
      return allLists.filter((list) => list.id !== listId)
    },
    [allLists],
  )

  const updateListChanges = useCallback(
    async (formdata) => {
      console.error("updateList", formdata)
      try {
        await updateList(formdata)
        setIsEdit(false)
        const filteredList = filterList(formdata.id)
        const lists = [formdata, ...filteredList]
        dispatch(listCollection.actions.updateListStore(lists))
      } catch (error) {
        console.error("updateList", error)
      }
    },
    [dispatch, filterList],
  )

  const onDelete = useCallback(
    async (id) => {
      console.error("onDelete", id)
      try {
        await deleteList(id)
        const filteredList = filterList(id)
        dispatch(listCollection.actions.updateListStore(filteredList))
      } catch (error) {
        console.error("onDelete", error)
      }
    },
    [dispatch, filterList],
  )

  return (
    <div className="content-wrapper">
      <ListHeader
        currentList={currentList}
        setIsEdit={setIsEdit}
        onDelete={onDelete}
      />
      <div className="content-section">
        <TaskListing listId={currentList?.id} />
      </div>

      {isEdit && (
        <Modal setVisible={setIsEdit} title="Update list">
          <ListForm
            submitHandler={updateListChanges}
            setVisible={setIsEdit}
            listData={currentList}
            buttonText="Update changes"
          />
        </Modal>
      )}
    </div>
  )
}

export default ListDetails
