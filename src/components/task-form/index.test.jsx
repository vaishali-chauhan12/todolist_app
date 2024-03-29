import { fireEvent, render, screen } from "@testing-library/react"
import TaskForm from "./index"

const mockSubmitHandler = jest.fn()
const mockSetNewTask = jest.fn()

describe("check new task form", () => {
  test("should render task form", () => {
    render(
      <TaskForm
        submitHandler={mockSubmitHandler}
        setNewTask={mockSetNewTask}
        isNewTask={true}
        task={null}
      />,
    )
    const formElement = screen.getByRole(/form/i)
    expect(formElement).toBeInTheDocument()
  })

  test("should render task title, details and datetime field", () => {
    render(
      <TaskForm
        submitHandler={mockSubmitHandler}
        setNewTask={mockSetNewTask}
        isNewTask={true}
        task={null}
      />,
    )
    const titleElement = screen.getByPlaceholderText(/Title/i)
    const detailsElement = screen.getByPlaceholderText(/Enter details/i)
    const dateTimeElement = screen.getByPlaceholderText(/Select date/i)

    expect(titleElement).toBeInTheDocument()
    expect(detailsElement).toBeInTheDocument()
    expect(dateTimeElement).toBeInTheDocument()
  })

  test("should render unchecked icon", () => {
    render(
      <TaskForm
        submitHandler={mockSubmitHandler}
        setNewTask={mockSetNewTask}
        isNewTask={true}
        task={null}
      />,
    )
    const uncheckedIconTitleElements = screen.getAllByText(/Mark Pending/i)
    expect(uncheckedIconTitleElements.length).toBeGreaterThanOrEqual(1)
  })

  test("should able to type in title input", () => {
    render(
      <TaskForm
        submitHandler={mockSubmitHandler}
        setNewTask={mockSetNewTask}
        isNewTask={true}
        task={null}
      />,
    )
    const titleElement = screen.getByPlaceholderText(/Title/i)
    fireEvent.change(titleElement, { target: { value: "task 1" } })
    expect(titleElement.value).toBe("task 1")
  })

  test("should able to type in details input", () => {
    render(
      <TaskForm
        submitHandler={mockSubmitHandler}
        setNewTask={mockSetNewTask}
        isNewTask={true}
        task={null}
      />,
    )
    const detailsElement = screen.getByPlaceholderText(/Enter details/i)
    fireEvent.change(detailsElement, { target: { value: "task 1 details" } })
    expect(detailsElement.value).toBe("task 1 details")
  })
})
