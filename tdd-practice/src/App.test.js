import { render, screen, act } from "@testing-library/react";
import App, { PaginatedList } from "./App";
import userEvent from "@testing-library/user-event";

test("renders an elements list title", () => {
  render(<App />);
  const titleList = screen.getByText(/ToDo List/);
  expect(titleList).toBeInTheDocument();
});

test("renders a label tag", () => {
  render(<App />);
  const labelTag = screen.getByLabelText(/write/i);
  expect(labelTag).toBeInTheDocument();
});

test("renders an input tag", () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});

test("renders an input placeholder", () => {
  render(<App />);
  const inputPlaceholder = screen.getByPlaceholderText(/Something to do.../);
  expect(inputPlaceholder).toBeInTheDocument();
});

test("renders an input type text", () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveAttribute("type", "text");
});

test("type an input field", () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  act(() => {
    userEvent.type(inputElement, "Making my bed");
  });
  screen.debug();
  expect(inputElement).toHaveValue("Making my bed");
});

test("renders a todo from imput value", () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  const addToDoButton = screen.getByRole("button", { name: /create/i });
  act(() => {
    userEvent.type(inputElement, "Do the washing up");
    userEvent.click(addToDoButton);
  });
  const inputValueText = screen.getByText("Do the washing up");
  expect(inputValueText).toBeInTheDocument();
});

test("renders a previous button", () => {
  render(<App />);
  const previousButton = screen.getByRole("button", { name: /previous/i });
  expect(previousButton).toBeInTheDocument();
});

test("renders a next button", () => {
  render(<App />);
  const nextButton = screen.getByRole("button", { name: /next/i });
  expect(nextButton).toBeInTheDocument;
});

test("renders a list with 3 todo's items", async () => {
  render(<App />);
  const toDoArray = ["One ToDo", "Two ToDo", "Trhee ToDo", "Four ToDo", "Five ToDo"];
  const inputElementTestList = screen.getByRole("textbox");
  const addingToDo = screen.getByRole("button", { name: /create/i });
  await act(async () => {
    toDoArray.map(async (item) => {
      userEvent.type(inputElementTestList, `${item}`);
      console.log(`Adding task: ${item}`);
      userEvent.click(addingToDo);
      console.log(`Clicked "Create" button`);
    });
  });
  console.log("Tasks added, now checking list...");
  const toDoList = await screen.getAllByRole("listitem");
  console.log("Number of tasks in list:", toDoList.length);
  console.log(
    "Tasks in list:",
    toDoList.map((item) => item.textContent)
  );
  expect(toDoList.length).toBe(3);
});

test("disable the next button, if there are no more pages", () => {
  const toDoArray = ["One ToDo", "Two ToDo", "Trhee ToDo"];
  const numberOfToDoPerPage = 3;
  render(
    <App>
      <PaginatedList toDoList={toDoArray} toDosQuantity={numberOfToDoPerPage} />
    </App>
  );
  const inputField = screen.getByRole("textbox");
  const createToDoButton = screen.getByRole("button", { name: /create/i });
  const nextPageButton = screen.getByRole("button", { name: /next/i });
  screen.debug();
  expect(nextPageButton).toBeDisabled();
});
