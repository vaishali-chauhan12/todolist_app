import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/button";
import Modal from "../../components/modal";
import ListForm from "../../components/list-form";
import { saveList } from "../../services/list";
import TaskListing from "../../components/task-listing";
import "./index.scss";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const defaultList = useSelector(
    (state) => state.listCollection.data.defaultList
  );

  const createList = (formdata) => {
    saveList(formdata)
      .then((response) => {
        setVisible(false);
      })
      .catch((error) => {
        console.error("catch", error);
      });
  };

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
      <div className="content-section">
        <TaskListing listId={defaultList.id} />
      </div>
    </div>
  );
};

export default Home;
