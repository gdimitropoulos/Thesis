import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const element = screen.getByTestId('test');
  expect(element).toHaveTextContent(/Hello World/i)
});
