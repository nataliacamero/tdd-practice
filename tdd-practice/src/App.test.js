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
  //Arrange
  render(<App />);
  const toDoArray = ["One ToDo", "Two ToDo", "Trhee ToDo", "Four ToDo", "Five ToDo"];
  const inputElementTestList = screen.getByRole("textbox");
  const addingToDo = screen.getByRole("button", { name: /create/i });
  //Act
  await act(async () => {
    toDoArray.map(async (item) => {
      userEvent.type(inputElementTestList, `${item}`);
      userEvent.click(addingToDo);
    });
  });
  const toDoList = await screen.getAllByRole("listitem");
  //Assert
  expect(toDoList.length).toBe(3);
});

test("disable the next button, if there are no more pages", async () => {
  //Arrange
  const toDoArray = ["One ToDo", "Two ToDo", "Trhee ToDo"];
  render(<App />);
  const inputField = screen.getByRole("textbox");
  const createToDoButton = screen.getByRole("button", { name: /create/i });
  const nextPageButton = screen.getByRole("button", { name: /next/i });
  //Act
  await act(async () => {
    toDoArray.map((item) => {
      userEvent.type(inputField, `${item}`);
      userEvent.click(createToDoButton);
    });
  });
  screen.debug();
  //Assert
  expect(nextPageButton).toBeDisabled();
});

test("enable next button when there are more pages", async () => {
  //Arrange
  const toDoArray = ["One ToDo", "Two ToDo", "Trhee ToDo", "Four ToDo"];
  render(<App />);
  const inputField = screen.getByRole("textbox");
  const createToDoButton = screen.getByRole("button", { name: /create/i });
  const tagNextButton = screen.getByRole("button", { name: /next/i });
  //Act
  await act(async () => {
    toDoArray.map((item) => {
      userEvent.type(inputField, `${item}`);
      userEvent.click(createToDoButton);
      userEvent.clear(inputField);
    });
  });
  screen.debug();
  //Assert
  expect(tagNextButton).toBeEnabled();
});

test("disable the Previous button, at the first page", async () => {
  //Arrange
  render(<App />);
  const previousButton = screen.getByRole("button", { name: /previo/i });
  //Assert
  expect(previousButton).toBeDisabled();
});
