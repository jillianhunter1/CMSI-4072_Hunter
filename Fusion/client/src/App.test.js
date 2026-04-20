import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Fusion heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Fusion/i);
  expect(headingElement).toBeInTheDocument();
});
