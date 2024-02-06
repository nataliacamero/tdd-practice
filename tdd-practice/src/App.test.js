import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';


test('renders an elements list title', () => {
  render(<App />);
  const titleList = screen.getByText(/TODO List/);
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

test('type an input field', async () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  await userEvent.type(inputElement, "Making my bed")
  screen.debug()
  expect(inputElement).toHaveValue("Making my bed")
});

test('renders a text from imput value', async () => {
  render(<App />);
  const inputElement = screen.getByRole("textbox");
  await userEvent.type(inputElement, "Do the washing up")
  const inputValueText = screen.findByText(/"Do the washing up"/)
  expect(inputValueText).toBeInTheDocument()
})



