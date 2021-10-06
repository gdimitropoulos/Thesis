import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import Home from './Home';

test('renders learn react link', async () => {
  render(<Home msg="fefeeffe" />);
  const element = screen.getByTestId('test');
  expect(element).toHaveTextContent(/Νέα Πανεπηστημίου πατρών/i)
});
