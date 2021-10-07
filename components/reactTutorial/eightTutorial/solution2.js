import React from 'react';
import { Link } from 'react-router-dom';

class Third extends React.Component {

  render() {

    return <div> <h2> I am on the Third page</h2>
    <Link to='/'>Go back</Link></div>;
  }
}

  export default  Third