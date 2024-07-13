import { fireEvent, render, screen } from "@testing-library/react"
import { TASK_STATUS_NAV_MENU } from "../../../constants"
import TaskListHeader from "./index"

const setActiveTab = jest.fn()

describe("task list header", () => {
  test("should render task status nav", () => {
    render(<TaskListHeader setActiveTab={setActiveTab} activeTab={1} />)
    const allNavItemElement = screen.getByText(TASK_STATUS_NAV_MENU.ALL)
    const pendingNavItemElement = screen.getByText(TASK_STATUS_NAV_MENU.PENDING)
    const completedNavItemElement = screen.getByText(
      TASK_STATUS_NAV_MENU.COMPLETED,
    )
    expect(allNavItemElement).toBeInTheDocument()
    expect(pendingNavItemElement).toBeInTheDocument()
    expect(completedNavItemElement).toBeInTheDocument()
  })
})
