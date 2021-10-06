import React from 'react';

class Button extends React.Component {
  
    render() {
      return (
        <button
          className="square"
          onClick={() => alert('i just clicked my first button')}
          id="my-button"
        >
            first Button!!
        </button>
      );
    }
  }

  export default Button; // Don’t forget to use export default!
