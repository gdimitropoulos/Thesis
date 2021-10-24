/* eslint-disable  react/no-unescaped-entities*/

import React, {
  useState, useEffect,
} from 'react';
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
import testAppCode from "!!raw-loader!../../components/reactTutorial/FirstReactTutorial/ApprealTest";
import Appcode from "!!raw-loader!../../components/reactTutorial/FirstReactTutorial/Apptest";
import indexFile from "!!raw-loader!../../components/reactTutorial/FirstReactTutorial/indexFiles";
import { useActiveCode } from "@codesandbox/sandpack-react";
import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackPreview,
  useSandpack,
  useSandpackNavigation,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import showNotification from '../../Lib/notification'
import { checkLessonTaken } from '../../Lib/dao';
import { getAppCookies } from '../../Lib/utils'

let backspaces = 0;
let totalCharsWritten = 0;
let writeFlag = 0;
let totalTries = 0;
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

export default function Start({ completed }) {
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

  const goBack = () => {
    router.push('/react/info1')
  }
  const goNext = () => {
    router.push('/react/second')
  }
  const pasteHandler = (event) => {
    if (event.path.length >15) {
      if (writeFlag == 0) {
        writeFlag = 1;
        console.log('here start')
        timeStartingWriting.push(moment());
      }
      var clipboardData, pastedData;
      clipboardData = event.clipboardData || window.clipboardData;
      pastedData = clipboardData.getData('Text');
      const count = pastedData.length - 1   
      totalCharsWritten += count;
    }
}

  const eventHandler = (event) => {

    if (event.path[0].className.includes('cm-content')) {
      if ((event.which > 46 && event.which < 91) || (event.which > 95 && event.which < 112) || (event.which > 183 && event.which < 230) || (event.which > 151 && event.which < 165)) {
        totalCharsWritten++;
        console.log('im here');
        if (writeFlag == 0) {
          writeFlag = 1;
          console.log('here start')
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
      lessonName: 'r1',
      tutorailName: 'react',
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
      await router.push('/react/second')
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
    const { refresh } = useSandpackNavigation();
    const { code, updateCode } = useActiveCode();

    useEffect(() => {
      const unsubscribe = listen((msg) => {
        console.log(msg)
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/App.js')
          }
          statuses.push(msg.test.status);
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
      window.addEventListener('paste', pasteHandler)
      window.addEventListener('keydown', eventHandler);
      return () => {
        window.removeEventListener('paste', pasteHandler)
        window.removeEventListener('keydown', eventHandler);
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

    const codee = files[activePath].code;

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
      <div style={{ height: '80%', marginBottom: '1%', marginTop: '2%', paddingTop: '2%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
        <Grid container overflow="auto" flex={1}  display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> To πρώτο σας Hello World </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Ήρθε η ώρα να γνωρίσετε την React js στην πράξη!
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Για αρχή θα εκτυπώσουμε στην οθόνη ένα απλό μήνυμα "Hello World" με βάση όσα γνωρίζετε απο την απλή Html.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Έχουμε αρχικοποιήσει για έσας ένα απλό πρότζεκτ ακολουθώντας όσα αναφέραμε προηγουμένως. Από τα αρχεία στα οποία αναφερθήκαμε συνοπτικά
                στα προηγούμενα μαθήματα, εμφανίζονται μόνο όσα  απαιτούν τροποποιήσεις από εσάς ή κρίνονται απαραίτητα  ώστε να γνωρίσετε την React σε ένα εισαγωγικό επίπεδο.
              </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%', marginTop: '1%' }}>
                Στα δεξιά βλέπετε το αρχείο App.js του οποίου η δομή  είναι αρχικοποιημένη με απλή Html. Όσα γνωρίζετε από την Html
                μπορούν να χρησιμοποιηθούν και στην React!
              </Typography>


              <div style={{ marginTop: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                Τροποποιήστε  τον κώδικα στη γραμμή 6 ώστε να εκτυπώνεται το κείμενο Hello World  και πατήστε <span style={{ fontStyle: 'italic' }}> Έλεγχος</span>.
              </Typography>
            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", height: '75vh', width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   React Tutorial  </Typography>

              <SandpackProvider template="react" customSetup={{
                files: {
                  // "/index.js": code,
                  //"/Test.js":testCode,
                  //"/QuickSort.js": quicksortCode,
                  //"/BubbleSort.js": bubblesortCode,
                  //"/index.html": `<div id="root"></div>`
                  "/App.js": Appcode,
                  "/App.test.js": {
                    code: testAppCode,
                    hidden: true
                  },
                  "index.js": indexFile,
                  "SetupTest.js": {
                    code: code,
                    hidden: true
                  }
                },
                dependencies: {
                  "react-markdown": "latest",
                  "jest-matchers": "latest",
                  "react-dom": "latest",
                  "react-test-renderer": "latest",
                  "react-router-dom": "latest",
                  "babel-runtime": "latest",
                  "@testing-library/react": "latest",
                  "@testing-library/jest-dom": "latest"
                },
                entry: '/intex.html'


              }}   >

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
          <Grid item xs={2} key="fot2">
            <Button variant="contained" onClick={goBack} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
              ΠΙΣΩ
            </Button>
          </Grid>
          {completed && (
            <Grid item xs={2} key="fot1">
              <Button variant="contained" onClick={goNext} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
                ΕΠΟΜΕΝΟ
              </Button>
            </Grid>
          )}

          <Grid item xs={2} key="fot">
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
                        Τό αρχείο App.js πρέπει να έχει την εξής μορφή:
                      </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                      <SyntaxHighlighter code={correctAnswer} language="javascript" showLineNumbers={true} />
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

      const completed = await checkLessonTaken(token.email,'r1');

      return {
        props: {
          completed
        },
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

