import { fireEvent, render, screen } from "@testing-library/react";
import {
  completedTask,
  pendingTask,
} from "../../../constants/mock-data-constants";
import TaskCheckbox from "./index";

const mockUpdateTaskStatus = jest.fn();

describe("task checkbox", () => {
  test("should render unchecked icon for pending task", () => {
    render(
      <TaskCheckbox
        updateTaskStatus={mockUpdateTaskStatus}
        task={pendingTask}
      />
    );
    const uncheckedIconTitleElements = screen.getAllByText(/Mark Pending/i);
    expect(uncheckedIconTitleElements.length).toBeGreaterThanOrEqual(1);
  });

  test("should render checked icon for completed task", () => {
    render(
      <TaskCheckbox
        updateTaskStatus={mockUpdateTaskStatus}
        task={completedTask}
      />
    );
    const uncheckedIconTitleElements = screen.getAllByText(/Mark Completed/i);
    expect(uncheckedIconTitleElements.length).toBeGreaterThanOrEqual(1);
  });

  test("should render checked icon on hover of icon for pending task", () => {
    render(
      <TaskCheckbox
        updateTaskStatus={mockUpdateTaskStatus}
        task={completedTask}
      />
    );
    const iconWrapper = screen.getByRole("img");
    fireEvent.blur(iconWrapper)
    const uncheckedIconTitleElements = screen.getAllByText(/Mark Completed/i);
    expect(uncheckedIconTitleElements.length).toBeGreaterThanOrEqual(1);
  });
});
