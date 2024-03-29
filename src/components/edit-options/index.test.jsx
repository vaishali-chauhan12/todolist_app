import { fireEvent, render, screen } from "@testing-library/react";
import EditOptions from "./index";

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

test("should open the dropdown when the options icon button is clicked", () => {
  render(<EditOptions currentList={mockOnEdit} onDelete={mockOnDelete} />);
  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  const dropDownElement = screen.getByRole("menu");
  expect(dropDownElement).toBeVisible();
});
