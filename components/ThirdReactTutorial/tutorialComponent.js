
import React from 'react';
import ReactDOM from 'react-dom';

class FlavorForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'coconut'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
          <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select  data-testid="select"  value={this.state.value} onChange={this.handleChange}>
              <option  data-testid="select-option1" value="grapefruit">Grapefruit</option>
              <option  data-testid="select-option2" value="lime">Lime</option>
              <option  data-testid="select-option3" value="coconut">Coconut</option>
              <option  data-testid="select-option4" value="mango">Mango</option>
            </select>
          </label>
        </form>
        { /*  Only change code inside h1 element*/}
        <h1  data-testid="h1"> {/*change code here*/ }</h1>

        </>
      );
    }
  }

  export default  FlavorForm