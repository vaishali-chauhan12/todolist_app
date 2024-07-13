import { fireEvent, render, screen } from "@testing-library/react";
import TaskListWrapper from "./index";
import { allTasks } from "../../../constants/mock-data-constants";
import { Provider } from "react-redux";
import { store } from "../../../store";

const MockTaskListWrapper = () => {
  return (
    <Provider store={store}>
      <TaskListWrapper
        allTasks={allTasks}
        currrentTaskList={allTasks}
        listId={1}
      />
    </Provider>
  );
};

describe("task list", () => {
  test("should render task list", async () => {
    render(<MockTaskListWrapper />);
    const taskList = screen.getAllByRole("listitem");
    expect(taskList).toHaveLength(3);
    expect(taskList[0]).toHaveTextContent(/Task 1/i);
    expect(taskList[1]).toHaveTextContent(/Task 2/i);
    expect(taskList[2]).toHaveTextContent(/Task 3/i);
  });

  test("should open the form when the Add task button is clicked", () => {
    render(<MockTaskListWrapper />);
    const buttonElement = screen.getByRole("button", { name: /Add task/i });
    fireEvent.click(buttonElement);
    const formElement = screen.getByRole("form");
    expect(formElement).toBeVisible();
  });
});
