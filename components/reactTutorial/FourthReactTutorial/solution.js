
import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: props.message}
  }

  componentDidMount(){
      // change state here so every time it mounts message is 'Νέα Πανεπηστημίου πατρών'
        this.setState({message: 'Νέα Πανεπηστημίου πατρών'});
    }
  render() {

    return <div> <h1 data-testid="test"> {this.state.message} </h1></div>;
  }
}

  export default  Home