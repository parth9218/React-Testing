import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { UserForm } from './UserForm';
import { User } from '../../models/user.model';

test('it shows two inputs and a button', () => {
  const functionTobeCalled = jest.fn();
  render(<UserForm handleUserAdd={functionTobeCalled} />);
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

describe('check different input combinations', () => {
  test('empty input', async () => {
    const args = {
      name: 'John',
      email: 'john@john.com'
    };
    const functionTobeCalled = jest.fn();
    render(<UserForm handleUserAdd={functionTobeCalled} />);
    // Binding of label and input is required.
    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    });
    // Alternate way to select a label
    // Binding of label and input is required.
    const emailInput = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button');

    await user.click(nameInput);
    await user.keyboard(args.name);

    await user.click(emailInput);
    await user.keyboard(args.email);

    await user.click(button);
    expect(functionTobeCalled).toHaveBeenCalledTimes(1);
    const passedUser = functionTobeCalled.mock.calls[0][0];
    expect(passedUser).toBeInstanceOf(User);
    expect(passedUser).toHaveProperty('id', expect.any(String));
    expect(passedUser).toHaveProperty('name', args.name);
    expect(passedUser).toHaveProperty('email', args.email);
  });

  test('invalid email', async () => {
    const functionTobeCalled = jest.fn();
    render(<UserForm handleUserAdd={functionTobeCalled} />);
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(inputs[0], 'John');
    await user.type(inputs[1], 'john');
    await user.click(button);

    expect(functionTobeCalled).toHaveBeenCalledTimes(0);
  });
  test('valid input values', async () => {
    const functionTobeCalled = jest.fn();
    render(<UserForm handleUserAdd={functionTobeCalled} />);
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    await user.type(inputs[0], 'John');
    await user.type(inputs[1], 'john@abc.com');
    await user.click(button);

    expect(functionTobeCalled).toHaveBeenCalledTimes(1);
  });
});

test('input is cleared once user gets added', async () => {
  const args = {
    name: 'John',
    email: 'john@john.com'
  };
  const functionTobeCalled = jest.fn();
  render(<UserForm handleUserAdd={functionTobeCalled} />);

  const nameInput = screen.getByRole('textbox', {
    name: /name/i
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i
  });
  const button = screen.getByRole('button');

  await user.click(nameInput);
  await user.keyboard(args.name);

  await user.click(emailInput);
  await user.keyboard(args.email);

  await user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});
