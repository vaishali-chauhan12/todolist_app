
import Button from "../../button";

const FallbackSection = (props) => {
    const {allTasks, setNewTask} = props;
    return (
        <div className="fallback-section">
        <img src="../../../assets/images/no_list.jpg" alt="no-list" />
        <div>
          <a
            className="attribution-text"
            href="https://www.freepik.com/free-vector/hand-drawn-checklist-background_3903465.htm#fromView=image_search_similar&page=2&position=48&uuid=13884f2c-a3f6-437b-9b27-ac831fee40cd"
          >
            Image by freepik
          </a>
        </div>
        <div className="fallback-text">
          <div className="fallback-text__line1">
            {allTasks.length === 0
              ? "No tasks yet"
              : "No tasks completed yet"}
          </div>

          {allTasks.length === 0 && (
            <div className="fallback-text__line2">
              Add your todos and keep track of them
            </div>
          )}
        </div>
        {allTasks.length === 0 && (
          <div className="create-button-wrapper">
            <Button
              type="button"
              color="success"
              variant="outline"
              clickHandler={() => setNewTask(true)}
            >
              Add task
            </Button>
          </div>
        )}
      </div>
    )
}

export default FallbackSection