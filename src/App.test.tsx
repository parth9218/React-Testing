import { render, screen } from '@testing-library/react';
import App from './App';

test('shows 6 products by default', async () => {
  render(<App />);
  const titles = await screen.findAllByRole('heading');
  expect(titles).toHaveLength(6);
});
