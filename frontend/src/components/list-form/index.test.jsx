import { fireEvent, render, screen } from "@testing-library/react";
import { listDetails } from "../../constants/mock-data-constants";
import { Provider } from "react-redux";
import { store } from "../../store";
import ListForm from "./index";

const mockSubmitHandler = jest.fn();
const MockListForm = ({ listData }) => {
  return (
    <Provider store={store}>
      <ListForm submitHandler={mockSubmitHandler} listData={listData} />
    </Provider>
  );
};

describe("list form", () => {
  test("should render list form", () => {
    render(<MockListForm listData={null} />);
    const formModal = screen.getByRole("form");
    expect(formModal).toBeVisible();
  });

  test("should render task title and note field", () => {
    render(<MockListForm listData={null} />);

    const titleInputElement = screen.getByPlaceholderText(/List Name/i);
    const noteInputElement = screen.getByPlaceholderText(/Note/i);

    expect(titleInputElement).toBeInTheDocument();
    expect(noteInputElement).toBeInTheDocument();
  });

  test("should able to type in name and note input", () => {
    render(<MockListForm listData={null} />);

    const titleInputElement = screen.getByPlaceholderText(/List Name/i);
    const noteInputElement = screen.getByPlaceholderText(/Note/i);

    fireEvent.change(titleInputElement, { target: { value: "list name" } });
    expect(titleInputElement.value).toBe("list name");

    fireEvent.change(noteInputElement, { target: { value: "list note" } });
    expect(noteInputElement.value).toBe("list note");
  });

  test("should populate list data in form on edit", async () => {
    render(<MockListForm listData={listDetails} />);

    const titleInputElement = screen.getByPlaceholderText(/List Name/i);
    expect(titleInputElement).toHaveValue(listDetails.title);

    const noteInputElement = screen.getByPlaceholderText(/Note/i);
    expect(noteInputElement).toHaveValue(listDetails.note);
  });
});
