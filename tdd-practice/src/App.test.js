import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders an elements list title', () => {
  render(<App />);
  const titleList = screen.getByText(/TODO List/);
  expect(titleList).toBeInTheDocument();
});

test('renders a label tag', () => {
  render(<App />);
  const labelTag = screen.getByLabelText(/Write/i);
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



