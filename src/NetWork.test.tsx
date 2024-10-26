import NetWork from './NetWork';
import { render, screen } from '@testing-library/react';

test('networking test', async () => {
  render(<NetWork waitFor={6} />);

  const listItems = await screen.findAllByRole(
    'listitem',
    {},
    { timeout: 7000 }
  );
  expect(listItems).toHaveLength(5);
}, 10000);
