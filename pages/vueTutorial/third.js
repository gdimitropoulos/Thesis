/* eslint-disable  react/no-unescaped-entities*/
import React, {
  useState, useEffect,
} from 'react';
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import { Popconfirm } from 'antd';
import {
  Button,
  Grid,
  Modal,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import appvue from "!!raw-loader!../../components/VueTutorial/thirdTutorial/appvue";
import mainjs from "!!raw-loader!../../components/VueTutorial/thirdTutorial/main";
import helloworld from "!!raw-loader!../../components/VueTutorial/thirdTutorial/helloworld";
import testing from "!!raw-loader!../../components/VueTutorial/thirdTutorial/testing";
import solutionfile from "!!raw-loader!../../components/VueTutorial/thirdTutorial/solution";
import { CopyBlock, dracula } from "react-code-blocks";
import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import showNotification from '../../Lib/notification'
import { getAppCookies } from '../../Lib/utils'


let backspaces = 0;
let totalCharsWritten=0;
let writeFlag=0;
let totalTries=0;
const timeStartingWriting=[]
const timeFinishingTest=[];
const backspacesPerTry=[];
const totaltCharsPerTry=[];
const time = moment();

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  height: '70vh',
  bgcolor: 'background.paper',
  borderRadius: '10%',
  boxShadow: 24,
  p: 4,
};

export default function Start() {
  const router = useRouter();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const [showSolution, setshowSolution] = useState(false);

  let statuses = [];
  const handleOpen = () => {
    if (statuses.includes('fail')) {
      setOpenFail(true);
    } else {
      setOpenSuccess(true);
    }
    statuses = [];
  }
  
  const eventHandler = (event)=>{
      
    if (event.path[0].className == 'cm-content') {
      if( (event.which > 46 && event.which<91) || ( event.which>95 && event.which<112) || (event.which>183 && event.which<230) || (event.which>151 && event.which<165 )){
        totalCharsWritten++;
        console.log('im here');
        if(writeFlag == 0){
          writeFlag=1;
          timeStartingWriting.push(moment());
        }
      }
      if (event.key == 'Backspace') {
        backspaces++;
      }
    }

}

  const handlecloseSolution = async () => {
    setshowSolution(false)
  }
  const handleCloseSuccess = async () => {
    const bodyData = {
      time,
      backspaces: backspaces,
      lessonName: 'a3',
      tutorailName:'vue',
      answer: answerShown,
      totalTries,
      totaltCharsPerTry,
      backspacesPerTry,
      timeFinishingTest,
      timeStartingWriting,
    }
    const res = await fetch('/api/finishTutorial', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    setOpenSuccess(false)
    if (res.status === 200) {
      showNotification(
        'success',
        'Επιτυχής καταγραφή ',
        'Επιτυχής καταγραφή της προσπάθειας'
      );
      await router.push('/VueTutorial/fourth')
    } else {
      showNotification(
        'error',
        'Σφάλμα ',
        'Κάτι πήγε στραβά'
      );
    }
  };
  const handleCloseFail = () => setOpenFail(false);
  const showSolutionModal = () => { setshowSolution(true); setAnswerShown(true) }
  const correctAnswer = `  import React from "react";
  
    export default function App() {
      return (
        
          <div id="Start"> 
             <h1> Hello World</h1>
          </div>
      );
    }
    
    `


  const SimpleCodeViewer = () => {
    const { sandpack, dispatch, listen } = useSandpack();
    const { files, activePath, setActiveFile, openFile } = sandpack;



    useEffect(() => {
      const unsubscribe = listen((msg) => {
        console.log(msg);
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/src/App.vue')
          }
          statuses.push(event.data.test.status);
        }
        if (msg.event == 'total_test_end') {
          handleOpen();
        }


      });

      console.log("im listening")
      return unsubscribe;
    }, [listen,dispatch,setActiveFile]);

   

    useEffect(() => {
      window.addEventListener('keydown',eventHandler);
      return () =>  window.removeEventListener('keydown',eventHandler);

    },[]);

    const runTests = () => { 
      writeFlag=0
      backspacesPerTry.push(backspaces);
      totaltCharsPerTry.push(totalCharsWritten);
      totalTries++;
      timeFinishingTest.push(moment());
      dispatch({ type: 'run-all-tests' }); };


    return (
      <div style={{ width: '100%', height: '40px' }}>
        <Button variant="contained" color='primary' style={{ height: '40px', width: "100%", textAlign: 'center' }} onClick={runTests} > Run Tests  </Button>;
      </div>
    );
  };

  const code = `import '@testing-library/jest-dom';
    `

  return (

    <div style={{ height: '60%' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '1%', marginTop: '5%', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
        <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Ας μετατρέψουμε το προηγούμενο πρόγραμμα σε δυναμικό! </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα  θα πρέπει να χρησιμοποιήσετε χαρακτηριστικά της Vue js  ωστε το πρόγραμμά μας, να αποκτήσει δυναμικότητα.
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Έχουμε αρχικοποιήσει για εσάς το HelloWorld.vue  το οποίο είναι το component που θα πρέπει να χρησιμοποιήσετε
                με ακριβώς τον ίδιο τρόπο όπως και στο προηγούμενο μάθημα.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Ένα πολύ σημαντικό feature της Vue js ειναι τα λεγόμενα <span style={{ fontWeight: 'bold' }}>directives</span> τα οποία είναι ένα συντακτικό για τα  attributes που βάζουμε σε Html tags και components,
                και προσφέρουν την δυναμικότητα που επιθυμούμε. Εμείς θα εξετάσουμε μόνο μερικά εξ αυτών, τα οποία είναι τα πιο βασικά.
                Για την πλήρη λίστα με τα directives της Vue μπορείτε να ανατρέξετε <a href="https://v3.vuejs.org/api/directives.html" rel="noreferrer" target="_blank" >εδώ</a>.

              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Ένα από τα  πιο συχνά χρησιμοποιούμενα directives είναι το <span style={{ fontWeight: 'bold' }}> v-bind</span>,  το οποίο "δένει"
                μια μεταβλήτη με ένα attribute έτσι ώστε το attribute να έχει πάντα την τιμή αυτής της μεταβλητής.
              </Typography>
              <CopyBlock
                text={`<template>
  <h1 v-bind:id="propName">{{ propName }}</h1>
</template>
                
<script>
   export default {
     name: 'App',
     props: {
      propName: String
          }
      }
</script>,`}
                language="html"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Στο παραπάνω παράδειγμα βλέπουμε να συνδέεται το prop με όνομα propName με το id του {`<h1> tag`} έτσι ώστε το id να παίρνει πάντα την τιμή της μεταβλητής propName.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Σε κάθε component που φτιάχνουμε μπορούμε να αρχικοποιήσουμε δεδομένα. Για να το κάνουμε αυτό
                χρησιμοποιούμε την συνάρτηση <span style={{ fontWeight: 'bold' }}>data() </span> με την οποία μπορούμε να επιστρέψουμε ότι δεδομένα θέλουμε.
                Ένα απλό παράδειγμα της συνάρτησης αυτής δίνεται παρακάτω :
              </Typography>
              <CopyBlock
                text={`<template>
  <div id="app">
    <h2>{{title}} </h2>
  </div>
</template>
<script>
  export default {
   name: 'App',
   data(){
     return{
       title: 'welcome in vue data function'
       }
    }
  }
</script>`}
                language="html"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Είναι σημαντικό να προσθέσουμε ότι όταν θέλουμε να κάνουμε access σε κάποια μεταβλητή μέσα στο scope της export default μπορούμε να το
                κάνουμε μέσω του keyword <span style={{ fontWeight: 'bold' }}> this </span> .
              </Typography>
              <CopyBlock
                text={`<template>
  <div id="app">
    <h2>{{title}} </h2>
  </div>
</template>
<script>
  export default {
   name: 'App',
   props: {
     propName: 'Hello World'
   }
   data(){
     return{
       title: this.propName
       }
    }
  }
</script>`}
                language="html"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />


              <div style={{ marginTop: '4%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Όπως αναφέραμε προηγουμένως έχουμε αρχικοποιήσει για έσας ένα απλό πρότζεκτ που περιέχει το component HelloWorld και την βασική δομή ενός Vue js πρότζεκτ.
                Πάρτε τον χρόνο σας να μελετήσετε τα αρχεία ώστε να καταλάβετε τι περιέχεται στο καθένα!
              </Typography>

              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                Τροποποιήστε το   <span style={{ backgroundColor: '#f4f4f4' }}>{`<template>`} </span> του App.vue έτσι ώστε να περνάτε ως prop στο Component HelloWorld
                την μεταβλητή mesage  που έχουμε αρχικοποιήσει στo data() μέσω του <span style={{ fontWeight: 'bold' }}> v-bind </span> directive.
              </Typography>
            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", height: '75vh', width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js Tutorial  </Typography>

              <SandpackProvider template="vue" customSetup={{
                files: {
                  "/src/App.vue": appvue,
                  "/src/main.js": {
                    code: mainjs,
                  },
                  "/components/HelloWorld.vue": helloworld,
                  "/tests/unit/app.spec.js": { code: testing, hidden: true }
                },
                dependencies: {
                  "babel-runtime": "latest",
                  "@vue/test-utils": "^2.0.0-rc.15",
                  "vue-jest": "latest",
                  "vue": "^3.2.19",
                  "vue-template-compiler": "latest",
                  "vue-loader": "latest",

                },
              }} entry>
                <SandpackThemeProvider  >
                  <SimpleCodeViewer />
                  <SandpackLayout theme="codesandbox-dark">
                    <SandpackCodeEditor showTabs="true" customStyle={{ marginTop: '10px', height: '500px', width: '400px' }}    > </SandpackCodeEditor>
                    <SandpackPreview viewportSize={{ width: 500, height: 500 }} />
                  </SandpackLayout>
                </SandpackThemeProvider>
              </SandpackProvider>

              <Modal
                keepMounted
                open={openSuccess}
                onClose={handleCloseFail}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Card styles={{ padding: '1%' }}>

                  <Box sx={style} >
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <CheckCircleIcon color="success" styles={{ marginBottom: '20px' }} id="keep-mounted-modal-title" sx={{ fontSize: 80 }} />
                    </div>
                    <Box style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                      <Typography style={{ marginTop: '2%' }} align="center" id="keep-mounted-modal-description" >
                        H απάντηση που δώσατε ήταν σωστή
                      </Typography>
                      <Button style={{ marginTop: '10%' }} variant="contained" color="primary" onClick={handleCloseSuccess}> Παμε στο επομενο</Button>
                    </Box>
                  </Box>
                </Card>

              </Modal>



              <Modal
                keepMounted
                open={openFail}
                onClose={handleCloseFail}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Card styles={{ padding: '1%' }}>

                  <Box sx={style} >
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <BlockSharpIcon styles={{ marginBottom: '20px' }} id="keep-mounted-modal-title" sx={{ color: red[500], fontSize: 80 }} />
                    </div>
                    <Box style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                      <Typography style={{ marginTop: '2%' }} align="center" id="keep-mounted-modal-description" >
                        H απάντηση που δώσατε ήταν λανθασμένη
                      </Typography>
                      <Button style={{ marginTop: '10%' }} variant="contained" color="secondary" onClick={handleCloseFail}> Προσπαθηστε ξανα</Button>
                    </Box>
                  </Box>
                </Card>

              </Modal>


            </Card>
          </Grid>
          <Grid item xs={10}>
          </Grid>
          <Grid item xs={2} key="fot">
            <Popconfirm
              title={'Είστε σίγουρος ότι θέλετε να δείτε την απάντηση'}
              onConfirm={showSolutionModal}
              okText={'Ναι'}
              cancelText={'Οχι'}

            >

              <Button variant="contained" color="secondary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
                λυση
              </Button>
            </Popconfirm>
            <Modal
              keepMounted
              open={showSolution}
              onClose={handlecloseSolution}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Card styles={{ padding: '1%' }}>

                <Box sx={style} >

                  <Box >
                    <div style={{ width: '100%' }}>
                      <Typography style={{ marginTop: '2%', marginBottom: '5%' }} align="center"  >
                        Τό template του  App.vue  πρέπει να έχει την εξής μορφή :
                      </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                      <SyntaxHighlighter code={solutionfile} language="html" showLineNumbers={true} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Button size="large" style={{ borderRadius: '50%', width: '40%', marginBottom: '1%', marginTop: '10%' }} variant="contained" color="primary" onClick={handlecloseSolution}>CLOSE</Button>
                    </div>
                  </Box>
                </Box>
              </Card>

            </Modal>

          </Grid>
        </Grid>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const KEY = process.env.JWT_KEY;
  //console.log(process.env.JWT_KEY);
  try {
    let cookies = getAppCookies(context.req);
    let token = cookies.token;

    if (token) {
      token = token.replace('Bearer ', '');
      token = jwt.verify(token, KEY);


      return {
        props: {},
      };

    }
    else {

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }

    }
  }
  catch (e) {
    console.error(e);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

