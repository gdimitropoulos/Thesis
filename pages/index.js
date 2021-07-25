import Head from 'next/head'
import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Iframe from 'react-iframe-click';

export default function Home() {
  useEffect( () => {
    let iframe=document.getElementById('geo');
    //let innerDoc = iframe.contentWindow.document;
    //let body=document.getElementById('geo').contentWindow.document.body.innerHTML
    //console.log(body)
    //console.log(innerDoc)
   // console.log(innerDoc)
    window.addEventListener('message', event => {
      // IMPORTANT: check the origin of the data! 
          // The data was sent from your site.
          // Data sent with postMessage is stored in event.data:
          console.log(event); 
      
  }); 
    console.log('here') ;

  }, []);
  return (
    <div className={styles.container}>
    <h1>im here</h1>
      {/*<Iframe id="geo" src="https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'500px', height:'100%', border:0, borderRadius: '4px', overflow: 'hidden'}}
     title="React"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
     onInferredClick={(e) => console.log(e)}

   ></Iframe>
  */}
    
    </div>
  )
}
