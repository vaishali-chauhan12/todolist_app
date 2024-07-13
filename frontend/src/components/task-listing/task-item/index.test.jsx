import { fireEvent, render, screen } from "@testing-library/react";
import TaskItem from "./index";
import { pendingTask } from "../../../constants/mock-data-constants";

const mockDeleteHandler = jest.fn();

describe("task item", () => {
  test("should render task title", async () => {
    render(<TaskItem task={pendingTask} deleteHandler={mockDeleteHandler} />);
    const taskElement = screen.getByText(pendingTask.title);
    expect(taskElement).toBeInTheDocument();
  });

  test("should render task edit form on title click", async () => {
    render(<TaskItem task={pendingTask} deleteHandler={mockDeleteHandler} />);
    const taskElement = screen.getByText(pendingTask.title);
    fireEvent.click(taskElement);
    const formElement = screen.getByRole("form");
    expect(formElement).toBeVisible();
  });

  test("should render task edit form on edit options click", async () => {
    render(<TaskItem task={pendingTask} deleteHandler={mockDeleteHandler} />);
    const buttonElement = screen.getByRole("button", { expanded: false });
    fireEvent.click(buttonElement);
    const editOptionElement = screen.getByText("Edit");
    fireEvent.click(editOptionElement);
    const formElement = screen.getByRole("form");
    expect(formElement).toBeVisible();
  });

  test("should populate task data in form on edit", async () => {
    render(<TaskItem task={pendingTask} deleteHandler={mockDeleteHandler} />);
    const taskElement = screen.getByText(pendingTask.title);
    fireEvent.click(taskElement);
    const titleInputElement = screen.getByPlaceholderText(/title/i);
    expect(titleInputElement).toHaveValue(pendingTask.title);

    const detailsElement = screen.getByPlaceholderText(/Enter details/i);
    expect(detailsElement).toHaveValue(pendingTask.details);
  });

//   check after redux state
//   test("should not render task on delete options click", async () => {
//     render(<TaskItem task={pendingTask} deleteHandler={mockDeleteHandler} />);
//     const buttonElement = screen.getByRole("button", { expanded: false });
//     fireEvent.click(buttonElement);
//     const deleteOptionElement = screen.getByText("Delete");
//     fireEvent.click(deleteOptionElement);
//     const taskElement = screen.getByText(pendingTask.title);
//     expect(taskElement).not.toBeInTheDocument();
//   });
});
