/* eslint-disable  react/no-unescaped-entities*/
import React, {
  useState, useEffect,
} from 'react';
import Image from 'next/image'
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CopyBlock, dracula } from "react-code-blocks";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import treePic from '../../public/array.png'
import { Popconfirm } from 'antd';
import { validityCheck, checkLessonTaken } from '../../Lib/dao';
import {
  Button,
  Grid,
  Modal,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import appvue from "!!raw-loader!../../components/VueTutorial/fifthTutorial/appvue";
import mainjs from "!!raw-loader!../../components/VueTutorial/fifthTutorial/main";
import helloworld from "!!raw-loader!../../components/VueTutorial/fifthTutorial/news";
import testing from "!!raw-loader!../../components/VueTutorial/fifthTutorial/testing";
import solutionfile from "!!raw-loader!../../components/VueTutorial/fifthTutorial/solution";

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
let totalCharsWritten = 0;
let writeFlag = 0;
let totalTries = 0;
let selectedText = '';
const timeStartingWriting = []
const timeFinishingTest = [];
const backspacesPerTry = [];
const totaltCharsPerTry = [];
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

export default function VueFifth({ completed }) {
  const router = useRouter();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const [showSolution, setshowSolution] = useState(false);

  let statuses = [];
  const handleOpen = () => {
    if (statuses.includes('pass') && !statuses.includes('fail') ) {
      setOpenSuccess(true);

    } else {
      setOpenFail(true);
    }
    statuses = [];
  }


  const goBack = () => {
    router.push('/vueTutorial/fourth')
  }

  const goNext = () => {
    router.push('/vueTutorial/sixth')
  }

  const pasteHandler = (event) => {
    if (event.path.length >15) {
      var clipboardData, pastedData;
      clipboardData = event.clipboardData || window.clipboardData;
      pastedData = clipboardData.getData('Text');
      const count = pastedData.length - 1   
      totalCharsWritten += count;
    }
}



const selectHandle = (event) => {
  if (event.srcElement.activeElement.className.includes('cm-content')) {
    selectedText = document.getSelection().toString();
  } else {
    selectedText = ''
  }
}


const eventHandler = (event) => {
  if (event.path[0].className.includes('cm-content')) {
    if ((event.which > 46 && event.which < 91) || (event.which > 95 && event.which < 112) || (event.which > 183 && event.which < 230) || (event.which > 151 && event.which < 165)) {
      totalCharsWritten++;
      if (selectedText.replace(/\s/g, '').length) {
        backspaces += selectedText.replace(/\s/g, '').length
      }
      if (writeFlag == 0) {
        writeFlag = 1;
        timeStartingWriting.push(moment());
      }
    }
    if (event.key == 'Backspace') {
      if (!selectedText.replace(/\s/g, '').length) {
        backspaces++;
      } else {     
        backspaces += selectedText.replace(/\s/g, '').length
      }
      /*if (selectedText != '') {
        backspaces += selectedText.length
        console.log(selectedText)
      } else {
        backspaces++;
      }
      */
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
      lessonName: 'v5',
      tutorailName: 'vue',
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
      await router.push('/vueTutorial/sixth')
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
    const { files, activePath, setActiveFile, openFile, resetAllFiles } = sandpack;



    useEffect(() => {
      const unsubscribe = listen((msg) => {
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/src/App.vue')
            statuses.push(event.data.test.status);

          }
          if(msg.test.status == 'pass'){
            statuses.push(msg.test.status);
          }
          
        }
        if(msg.event=='file_error' && msg.type=='test'){
          statuses.push('fail')
        }
        if (msg.event == 'total_test_end') {
          handleOpen();
        }


      });
      return unsubscribe;
    }, [listen, dispatch, setActiveFile]);



   
    useEffect(() => {
      document.addEventListener('selectionchange', selectHandle);
      window.addEventListener('paste', pasteHandler)
      window.addEventListener('keydown', eventHandler);
      return () => {
        window.removeEventListener('paste', pasteHandler)
        window.removeEventListener('keydown', eventHandler);
        document.removeEventListener('selectionchange', selectHandle);
        return null
      }

    }, []);

    const runTests = () => {
      writeFlag = 0
      backspacesPerTry.push(backspaces);
      totaltCharsPerTry.push(totalCharsWritten);
      totalTries++;
      if(timeStartingWriting.length<timeFinishingTest.length + 1){
        timeStartingWriting.push(moment())
      }
      timeFinishingTest.push(moment());
      dispatch({ type: 'run-all-tests' });
    };


    return (
      <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
      <div  style={{ height: '40px', width: "50%", textAlign: 'center' }}>
      <Popconfirm
              title={'Είστε σίγουρος ότι θέλετε να επαναφέρετε τον κώδικα στην αρχική του κατάσταση? Όλη η πρόοδος σας θα χαθεί.'}
              onConfirm={resetAllFiles}
              okText={'Ναι'}
              cancelText={'Οχι'}

            >
        <Button variant="contained" color='primary' style={{ height: '40px', width: "100%", textAlign: 'center' }}  > επαναφορα κωδικα  </Button>;
        </Popconfirm>
        </div>
         <Button variant="contained" color='primary' style={{ height: '40px', width: "50%", textAlign: 'center' }} onClick={runTests} > ελεγχοσ  </Button>;
      </div>
    </>
    );
  };

  const code = `import '@testing-library/jest-dom';
    `

  return (

    <div style={{ height: '60%' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '1%', marginTop: '5%', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
        <Grid container overflow="auto" flex={1}  display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Aς εμβαθύνουμε λίγο στα directives! </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα  θα πρέπει να χρησιμοποιήσετε τo directive <span style={{ fontWeight: 'bold' }}>v-for</span> της Vue js.
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Στο προηγούμενο μάθημα διδαχθήκατε τι είναι τα  <span style={{ fontWeight: 'bold' }}>directives</span> της Vue και είδατε στην πράξη πως λειτουργεί το <span style={{ fontWeight: 'bold' }}>v-bind</span>.
                Tώρα ήρθε η ώρα να δούμε ένα λίγο πιο πολύπλοκο παράδειγμα για να εξοικειωθείτε περισσότερο με τα directives. Το <span style={{ fontWeight: 'bold' }}>v-for</span> λειουργεί σαν iterator πανω σε μια λίστα
                και κάνει render το εσωτερικό περιεχόμενο του. Ας δούμε ένα παράδειγμα!
              </Typography>
              <CopyBlock
                text={`<template>
  <div id="example-1">
    <ul>
      <li v-for="item in items" :key="item.message">
         {{ item.message }}
      </li>
    </ul>
  </div>
</template>
              
<script>
export default {
   name: "Example",
   data() {
    return {
      items: [{ message: "Foo" }, { message: "Bar" }],
      };
  },
};
</script>
              
 <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
 #example-1{
    display: flex;
    justify-content: center;
    align-self: center;
  }
h3 {
   margin: 40px 0 0;
  }
ul {
    border: 1px solid black;
    min-width: 300px;
    list-style-type: none;
    padding: 0;
  }
li {
    margin: 10px 10px;
   }
a {
  color: #42b983;
  }
  </style>
          
              `}
                language="html"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Στο παραπάνω παράδειγμα βλέπουμε πως μπορεί κανείς να χρησιμοποιήσει τη <span style={{ fontWeight: 'bold' }}>v-for </span>
                για να φτιάξει μια λίστα με δυναμικά δεδομένα. Ας το δούμε βήμα-βήμα! Στην γραμμή :
              </Typography>
              <CopyBlock
                text={`<li v-for="item in items" :key="item.message">`}
                language="html"
                showLineNumbers={false}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                μπορούμε να δούμε ακριβώς πως το χρησιμοποιούμε!

              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Δεδομένου ενός πινάκα δηλώνουμε μια μεταβλητή με την οποία θα κάνουμε iteration,
                στην δική μας περίπτωση το "item" . Έπειτα αυτή την μεταβλητή μπορούμε να την χρησιμοποιήσουμε όπως εδώ :
              </Typography>
              <CopyBlock
                text={`<li v-for="item in items" :key="item.message">
  {{ item.message }}
</li>`}
                language="html"
                showLineNumbers={false}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                To αποτέλεσμα του παραπάνω κώδικα είναι το εξής:
              </Typography>
              <div style={{ width: "100%", height: 120, display: 'flex', justifyContent: 'center' }}>
                <div style={{ height: 300, maxWidth: 300 }}>
                  <Image style={{ marginTop: 5 }} src={treePic} alt="Picture of the folders tree" />
                </div>
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                <span style={{ fontWeight: 'bold' }}>Σημείωση</span>: όταν χρησιμοποιούμε την <span style={{ fontWeight: 'bold' }}>v-for </span> πρέπει να ορίζουμε
                και unique keys στα component που γίνονται iterate.
              </Typography>

              <div style={{ marginTop: '4%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Έχουμε αρχικοποιήσει ένα απλό πρότζεκτ Vue js. Πάρτε όσο χρόνο χρειάζεστε για να μελετήσετε τις δομές των αρχείων Home.vue, News.vue και App.vue .
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα πρέπει να χρησιμοποιήσετε την <span style={{ fontWeight: 'bold' }}>v-for </span>
                και να τροποποιήσετε το αρχείο News.vue στην γραμμή 4 έτσι ώστε να φαίνεται το title των Νέων στο <span style={{ backgroundColor: '#f4f4f4' }}> {`<h3></h3>`}</span> και
                το text στο <span style={{ backgroundColor: '#f4f4f4' }}>{`<p></p>`}</span>
              </Typography>
              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                 <span style={{ fontWeight: 'bold' }}>{`Σημείωση: `}</span> για <span style={{ fontWeight: 'bold' }}>{`key `}</span> στο 
                 div χρησιμοποιήστε το id που έχει αρχικοποιηθεί στον πίνακα articles!
              </Typography>


            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ height: '75vh', padding: "1%", width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js Tutorial  </Typography>

              <SandpackProvider template="vue" customSetup={{
                files: {
                  "/src/App.vue": { code: appvue, active: true },
                  "/src/main.js": {
                    code: mainjs,
                  },
                  "/tests/unit/app.spec.js": { code: testing, hidden: true },
                  "/src/components/News.vue": { code: helloworld, active: false }

                },
                dependencies: {
                  "babel-runtime": "latest",
                  "@vue/test-utils": "^2.0.0-rc.15",
                  "vue-jest": "latest",
                  "vue": "^3.2.19",
                  "vue-template-compiler": "latest",
                  "vue-loader": "latest",

                },
              }} >
                <SandpackThemeProvider  >
                  <SandpackLayout theme="codesandbox-dark">
                    <SandpackCodeEditor showLineNumbers="true" showTabs="true" customStyle={{ marginTop: '0.5vh', height: '59.5vh', width: '400px' }}    > </SandpackCodeEditor>
                    <SandpackPreview viewportSize={{ width: 500, height: '60vh' }} />
                    <SimpleCodeViewer />
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

          <Grid item xs={completed ? 6 : 8}></Grid>
          <Grid item xs={2} key="fot1">
            <Button variant="contained" onClick={goBack} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
              ΠΙΣΩ
            </Button>
          </Grid>
          {completed && (
            <Grid item xs={2} key="fot2">
              <Button variant="contained" onClick={goNext} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
                επομενο
              </Button>
            </Grid>
          )}

          <Grid style={{ display: 'flex', width: '100%' }} item xs={2} key="fot">
            <Popconfirm
              title={'Είστε σίγουρος ότι θέλετε να δείτε την απάντηση'}
              onConfirm={showSolutionModal}
              okText={'Ναι'}
              cancelText={'Οχι'}


            >

              <Button variant="contained" style={{ backgroundColor: '#19E619', minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
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
                        {"Τό <template> του  News.vue  πρέπει να έχει την εξής μορφή :"}
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

      const bool = await validityCheck('v4', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email, 'v5');

        return {
          props: {
            completed
          },
        };
      } else {
        return {
          redirect: {
            destination: '/vueTutorial/fourth',
            permanent: false,
          },
        }
      }

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

