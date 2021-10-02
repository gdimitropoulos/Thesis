import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import App from './App';

test('renders learn react link', async () => {
  render(<App />);
   fireEvent.change(screen.getByTestId('select') , { target: { value: 'lime' } })
  const h1Element= screen.getByTestId('h1');
  expect(h1Element).toHaveTextContent(/lime/i)
});
