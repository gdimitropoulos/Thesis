import React from 'react';
import { Link } from 'react-router-dom';

class Second extends React.Component {

  render() {

    return <div> <h2> I am on the Second page</h2>
    <Link to='/'>Go back</Link>
    </div>
  }
}

  export default  Second