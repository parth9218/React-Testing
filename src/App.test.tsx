import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('render the app', () => {
  render(<App />);
  const div = screen.getByRole('heading', { name: /users/i });
  expect(div).toBeInTheDocument();
});

test('receive a new user and render it', async () => {
  const name = 'John';
  const email = 'john@example.com';
  render(<App />);
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  await user.click(nameInput);
  await user.keyboard(name);

  await user.click(emailInput);
  await user.keyboard(email);

  const button = screen.getByRole('button');
  await user.click(button);

  const nameCell = screen.getByRole('cell', { name: name });
  expect(nameCell).toBeInTheDocument();
  const emailCell = screen.getByRole('cell', { name: email });
  expect(emailCell).toBeInTheDocument();
});
