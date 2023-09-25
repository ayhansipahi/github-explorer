import { render } from '@testing-library/react';
import Header from './Header';

test('renders the app title', () => {
  const { getByText } = render(<Header />);
  const titleElement = getByText(/Github User Explorer/i);
  expect(titleElement).not.toBeNull();
});