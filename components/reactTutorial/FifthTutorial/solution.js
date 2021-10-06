
import React from 'react';


export default  function Home({msg}){
  const [message, setMessage] = React.useState(msg);

  React.useEffect(()=>{
      setMessage('Νεα Πανεπηστημίου πατρών ')
  },[]);


  
  return (<div> <h1 data-testid="test"> {message} </h1></div>);


}