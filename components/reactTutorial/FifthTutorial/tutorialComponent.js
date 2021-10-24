
import React from 'react';


export default  function Home({msg}){
  const [message, setMessage] = React.useState(msg);

  React.useEffect(()=>{
      // change state here so every time it mounts message is 'Νέα Πανεπιστημίου Πατρών'

    },[]);


  
  return (<div> <h1 data-testid="test"> {message} </h1></div>);


}