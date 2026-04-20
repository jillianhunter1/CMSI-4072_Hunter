import { render, screen, fireEvent } from '@testing-library/react';
import Response from './Response';

test('renders Response component and toggles open', () => {
  const title = 'Test AI';
  const response = 'Test response content';
  render(<Response title={title} response={response} />);

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(response)).toBeInTheDocument();

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
});
