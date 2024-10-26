import { render, screen } from '@testing-library/react';
import {
  AccessibleNames,
  ElementByRole,
  IconButtons,
  InputElements,
  RoleExample
} from './App';

//roles example
test('can find elements by role', () => {
  render(<RoleExample />);

  const roles = [
    'link',
    'button',
    'contentinfo',
    'heading',
    'banner',
    'img',
    'checkbox',
    'spinbutton',
    'radio',
    'textbox',
    'listitem',
    'list'
  ];

  for (let role of roles) {
    const el = screen.getByRole(role);

    expect(el).toBeInTheDocument();
  }
});

// roles
test('roles', async () => {
  render(<ElementByRole />);
  const list = await screen.findByRole('list');
  expect(list).toBeInTheDocument();
});

// accessible role names
test('button names', async () => {
  render(<AccessibleNames />);
  const button = await screen.findByRole('button', { name: /submit/i });
  expect(button).toBeInTheDocument();
});

// assigning aria-labels to buttons for roles
test('icon buttons', async () => {
  render(<IconButtons />);
  const deleteButton = await screen.findByRole('button', { name: /delete/i });
  const editButton = await screen.findByRole('button', { name: /edit/i });
  expect(deleteButton).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
});

// link input elements via labels
test('link input elements', () => {
  render(<InputElements />);
  const input = screen.getByRole('textbox', { name: /name/i });
  expect(input).toBeInTheDocument();
});
