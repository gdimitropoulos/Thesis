import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import App from './App';

test('renders learn react link', async () => {
  render(<App msg="fefeeffe" />);
  let array=['H νέα σχολική χρόνια ξεκινάει απο 11 Οκτωμβρίου','Αποτελέσματα εξεταστική περιόδου για το μάθημα Βασεις 2','Νέα έρευνα του πανεπηστημίου Πατρών']
  for(let i=1; i<4;i++){
    console.log(i);
    var re = new RegExp(array[i-1],'i');
    console.log(re);
    const element = screen.getByTestId(`${i}`);
    expect(element).toHaveTextContent(re)
  }
 
});
