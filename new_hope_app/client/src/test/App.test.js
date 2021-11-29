import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';

test('renders welcome component on load', () => {
  render(<App />);
  
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});

test('renders dog component when user clicks on nav', () => {
  render(<App />);
  const dogs = screen.getByText(/dogs/i);

  userEvent.click(dogs)

  expect(screen.getByText(/Click on a dog to update their information/i)).toBeInTheDocument();
});

test('renders staff component when user clicks on nav', () => {
  render(<App />);
  const staff = screen.getByText(/staff/i);

  userEvent.click(staff)

  expect(screen.getByText(/Click on a staff to update their information/i)).toBeInTheDocument();
});

test('renders homevisit component when user clicks on nav', () => {
  render(<App />);
  const homevisit = screen.getByText(/homevisit/i);

  userEvent.click(homevisit)

  expect(screen.getByText(/Click on a homevisit to update its information/i)).toBeInTheDocument();
});

