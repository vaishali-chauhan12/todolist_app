import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import Sidebar from "./index";

jest.mock("../../utils/api-service", () => {
  return (APIService = () => {
    return Promise.resolve({
      code: "200",
      message: "",
      resultObj: [
        {
          id: 1,
          title: "test list 1",
          note: "test list 1",
        },
        {
          id: 2,
          title: "test list 2",
          note: "test list 2",
        },
      ],
    });
  });
});

const MockSideBar = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  );
};

test("should render all list in sidebar", async () => {
  render(<MockSideBar />);

  const navItems = await screen.findAllByTestId(/list-nav-item/i);
  expect(navItems.length).toBe(2);
});
