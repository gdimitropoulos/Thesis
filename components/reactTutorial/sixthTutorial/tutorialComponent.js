
import React from 'react';
import News from './News';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: [
        {title: 'Έναρξη μαθημάτων', text: 'H νέα σχολική χρόνια ξεκινάει απο 11 Οκτωμβρίου',id : 1,target: 'first'}, 
        {title: 'Ανακοίνωση βαθμολογιών ', text: 'Αποτελέσματα εξεταστική περιόδου για το μάθημα Βασεις 2 ',id: 2,target: 'second'},
        {title: 'Αποτελέσματα έρευνας',text: 'Νέα έρευνα του πανεπηστημίου Πατρών',id: 3,target: 'third'}
      ]};
  }
  render() {

    return <div> <News news={this.state.message} /></div>;
  }
}

  export default  Home