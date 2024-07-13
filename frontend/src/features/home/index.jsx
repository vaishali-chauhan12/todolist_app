import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Modal from "../../components/modal";
import ListForm from "../../components/list-form";
import { saveList } from "../../services/list";
import TaskListing from "../../components/task-listing";
import { updateListCollection } from "../../store/list";
import { listCollection } from "../../store/list";

import "./index.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const defaultList = useSelector(
    (state) => state.listCollection.data.defaultList
  );
  const userId = useSelector((state) => state.authUser.data.userId);

  const createList = (formdata) => {
    saveList(formdata)
      .then((response) => {
        const listId = response?.resultObj?.id;
        dispatch(updateListCollection({ userId }));
        setVisible(false);
        listId && navigate(`/list/${listId}`);
      })
      .catch((error) => {
        console.error("catch", error);
      });
  };

  const updateActiveList = useCallback(async () => {
    try {
      dispatch(listCollection.actions.updateActiveList({ listId: null }));
    } catch (error) {
      console.error("updateActiveList", error);
    }
  }, [dispatch]);

  useEffect(() => {
    updateActiveList();
  }, [dispatch, updateActiveList]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="content-heading">
          <div className="content-mainheading">Home</div>
        </div>
        <Button color="success" clickHandler={() => setVisible(!visible)}>
          Create a list
        </Button>
      </div>

      {visible && (
        <Modal
          setVisible={setVisible}
          title="Create a list"
          primaryButtonText="Save changes"
        >
          <ListForm submitHandler={createList} setVisible={setVisible} />
        </Modal>
      )}
      {defaultList && (
        <div className="content-section">
          <TaskListing listId={defaultList.id} />
        </div>
      )}
    </div>
  );
};

export default Home;
