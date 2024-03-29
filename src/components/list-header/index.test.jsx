import { fireEvent, render, screen } from "@testing-library/react"
import ListHeader from "./index"

const listDetails = {
  title: "List 2",
  note: "list 2 details",
}

test("should render list title", () => {
  render(
    <ListHeader
      currentList={listDetails}
      setIsEdit={() => {}}
      onDelete={() => {}}
    />,
  )
  const titleElement = screen.getByText(listDetails.title)
  expect(titleElement).toBeVisible()
})

test("should render list note", () => {
  render(
    <ListHeader
      currentList={listDetails}
      setIsEdit={() => {}}
      onDelete={() => {}}
    />,
  )
  const noteElement = screen.getByText(listDetails.note)
  expect(noteElement).toBeVisible()
})

test("should open the dropdown when the options icon button is clicked", () => {
  render(
    <ListHeader
      currentList={listDetails}
      setIsEdit={() => {}}
      onDelete={() => {}}
    />,
  )
  const buttonElement = screen.getByRole("button")
  fireEvent.click(buttonElement)
  const dropDownElement = screen.getByRole("menu")
  expect(dropDownElement).toBeVisible()
})
