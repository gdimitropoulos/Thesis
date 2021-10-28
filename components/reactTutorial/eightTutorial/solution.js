
import React from 'react';
import { Link } from 'react-router-dom';

class First extends React.Component {

  render() {

    return <div> <h2> I am on the first page</h2>
    <Link to='/'>Go back</Link>
    </div>
  }
}

  export default  First