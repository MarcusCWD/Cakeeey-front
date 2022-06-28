import { render, screen } from '@testing-library/react';
import App from './App';

test('render header', () => {
  render(<App />);
  const headerElement = screen.getByText(/From 01 May to 22 May, enjoy our special seasonal cakes!/i);
  expect(headerElement).toBeInTheDocument();
});

test('render footer', () => {
  render(<App />);
  const footerElement = screen.getByText(/Our Location: 76 Bukit Timah Road #01-34 Singapore 198253/i);
  expect(footerElement).toBeInTheDocument();
});
