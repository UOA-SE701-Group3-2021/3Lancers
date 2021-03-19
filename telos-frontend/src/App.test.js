import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app div', () => {
  render(<App />);
  const linkElement = screen.getByTestId('test');
  expect(linkElement).toBeInTheDocument();
});
