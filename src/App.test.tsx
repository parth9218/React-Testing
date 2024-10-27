import { render, screen, within } from '@testing-library/react';
import App from './App';
import { expect } from '@jest/globals';
import type { MatcherFunction } from 'expect';

test('illustrate within function', () => {
  render(<App />);
  const buttons = within(screen.getByRole('form')).getAllByRole('button');
  expect(buttons).toHaveLength(2);
});

/**
 * Custom matcher
 */
const toContainRole: MatcherFunction<[string, number]> = function (
  container,
  role,
  quantity
) {
  let pass = false;
  let message = () => '';
  const elements = within(container as HTMLElement).getAllByRole(role);
  pass = elements.length === quantity;
  if (pass) {
    message = () =>
      `Expected ${container} to contain ${quantity} elements with role ${role}`;
  } else {
    message = () =>
      `Expected ${container} to contain ${quantity}\n But found ${elements.length} elements with role ${role}`;
  }
  return {
    pass,
    message
  };
};

expect.extend({ toContainRole });

declare module 'expect' {
  interface Matchers<R> {
    toContainRole(role: string, quantity: number): R;
  }
}

test('illustrate custom matcher', () => {
  render(<App />);
  const form = screen.getByRole('form');
  expect(form).toContainRole('button', 2);
});
