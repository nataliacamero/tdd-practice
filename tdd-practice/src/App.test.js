import { render, screen, act } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';


test('renders an elements list title', () => {
  render(<App />);
  const titleList = screen.getByText(/ToDo List/);
  expect(titleList).toBeInTheDocument();
});

test('renders a label tag', () => {
  render(<App />);
  const labelTag = screen.getByLabelText(/write/i);
  expect(labelTag).toBeInTheDocument();
});

test('renders an input tag', () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});

test('renders an input placeholder', () => {
  render(<App />);
  const inputPlaceholder = screen.getByPlaceholderText(/Something to do.../);
  expect(inputPlaceholder).toBeInTheDocument();
});

test('renders an input type text', () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveAttribute('type', 'text');
});

test('type an input field', () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  act(() => {
    userEvent.type(inputElement, "Making my bed")
  });
  screen.debug()
  expect(inputElement).toHaveValue("Making my bed")
});

test('renders a todo from imput value', () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  const addToDoButton = screen.getByRole("button")
  act(() => {
    userEvent.type(inputElement, 'Do the washing up')
    userEvent.click(addToDoButton)
  });
  const inputValueText = screen.getByText('Do the washing up')
  expect(inputValueText).toBeInTheDocument()
})



