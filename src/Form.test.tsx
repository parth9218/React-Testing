import { render, screen } from '@testing-library/react';
import { Form } from './Form';

test('selecting different elements', () => {
  render(<Form />);

  const elements = [
    screen.getByRole('button'), // submit button
    screen.getByTitle(/click when ready to submit/i),
    screen.getByAltText(/data/i), // image
    screen.getByLabelText(/email/i), // email input
    screen.getByPlaceholderText(/red/i), // input element
    screen.getByText(/enter data/i), // h3 element
    screen.getByDisplayValue(/asdf@asdf.com/i), // email input
    screen.getByTestId('image wrapper') // div around image
  ];

  for (const element of elements) {
    expect(element).toBeInTheDocument();
  }
});
