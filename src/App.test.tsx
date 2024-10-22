import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('shows 6 products by default', async () => {
  render(<App />);
  const titles = await screen.findAllByRole('heading');
  expect(titles).toHaveLength(6);
});

test('clicking on the button loads 6 more products', async () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /load more/i });
  userEvent.click(button);
  await waitFor(async () => {
    const titles = await screen.getAllByRole('heading');
    expect(titles).toHaveLength(12);
  });
});
