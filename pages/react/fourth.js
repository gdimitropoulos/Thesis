/*eslint-disable react/no-unescaped-entities */
import React, {
  useState, useEffect,
} from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import { red } from '@mui/material/colors';
import { Popconfirm } from 'antd';
import {
  Button,
  Grid,
  Modal,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import { validityCheck, checkLessonTaken } from '../../Lib/dao';
import { CopyBlock, dracula } from "react-code-blocks";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import testAppCode from "!!raw-loader!../../components/reactTutorial/FifthTutorial/tutorialAppTest.txt";
import testAppCode1 from "!!raw-loader!../../components/reactTutorial/FifthTutorial/tutorialAppTest1.txt";
import Appcode from "!!raw-loader!../../components/reactTutorial/FifthTutorial/tutorialApp.txt";
import indexFile from "!!raw-loader!../../components/reactTutorial/FifthTutorial/tutorialIndex.txt";
import componentCode from "!!raw-loader!../../components/reactTutorial/FifthTutorial/tutorialComponent.html";
import appcss from "!!raw-loader!../../components/reactTutorial/FifthTutorial/App.css";
import solutionCode from "!!raw-loader!../../components/reactTutorial/FifthTutorial/solution.html";
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
    if (statuses.includes('pass') && !statuses.includes('fail') ) {
      setOpenSuccess(true);

    } else {
      setOpenFail(true);
    }
    statuses = [];
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

  const eventHandler = (event) => {

    if (event.path[0].className.includes('cm-content')) {
      if ((event.which > 46 && event.which < 91) || (event.which > 95 && event.which < 112) || (event.which > 183 && event.which < 230) || (event.which > 151 && event.which < 165)) {
        totalCharsWritten++;
        if (writeFlag == 0) {
          writeFlag = 1;
          timeStartingWriting.push(moment());
        }
      }
      if (event.key == 'Backspace') {
        backspaces++;
      }
    }

  }
  const goBack = () => {
    router.push('/react/third')
  }

  const goNext = () => {
    router.push('/react/fifth')
  }
  const handlecloseSolution = async () => {
    setshowSolution(false)
  }
  const handleCloseSuccess = async () => {
    const bodyData = {
      time,
      backspaces: backspaces,
      lessonName: 'r4',
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
    if (res.status === 200) {
      showNotification(
        'success',
        'Επιτυχής καταγραφή ',
        'Επιτυχής καταγραφή της προσπάθειας'
      );
      await router.push('/react/fifth')
    } else {
      showNotification(
        'error',
        'Σφάλμα ',
        'Κάτι πήγε στραβά'
      );
    }
    setOpenSuccess(false)
  };
  const handleCloseFail = () => setOpenFail(false);
  const showSolutionModal = () => { setshowSolution(true); setAnswerShown(true) }





  const SimpleCodeViewer = () => {
    const { sandpack, dispatch, listen } = useSandpack();
    const { files, activePath, setActiveFile, openFile, resetAllFiles } = sandpack;
    const { refresh } = useSandpackNavigation();
    const { code, updateCode } = useActiveCode();


    useEffect(() => {
      window.addEventListener('paste', pasteHandler)
      window.addEventListener('keydown', eventHandler);
      return () => {
        window.removeEventListener('paste', pasteHandler)
        window.removeEventListener('keydown', eventHandler);
        return null
      }

    }, []);

    useEffect(() => {
      const unsubscribe = listen((msg) => {
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/App.js')
            statuses.push(msg.test.status);
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
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Hooks and Functional Component </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα  θα μετατρέψουμε το class component του προηγούμενου μαθήματος σε <span style={{ fontWeight: 'bold' }}>functional </span>!
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Έχουμε αρχικοποιήσει για εσάς το Home.js  το οποίο είναι το component που θα πρέπει να χρησιμοποιήσετε.
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Αρχικά ας μιλήσουμε για τα <span style={{ fontWeight: 'bold' }}> states </span> και πως μπορούμε να τα αρχικοποιήσουμε. Το γεγονός πως δεν έχουμε κλάση συνεπάγεται ότι δεν έχουμε constructor ().
                Αυτό σημαίνει ότι δεν μπορούμε να κάνουμε απευθείας ανάθεση σε state. Για να προσομοιώσουμε τη λειτουργεία του state που είχαμε θα χρησιμοποποιήσουμε
                κάποια api που μας δίνει η React και ονομάζονται <span style={{ fontWeight: 'bold' }}> Hooks </span>.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                To πρώτο  <span style={{ fontWeight: 'bold' }}> Hook </span> για το οποίο θα μιλήσουμε είναι το  <span style={{ fontWeight: 'bold' }}> useState </span>.
                Ας το δούμε με ένα παράδειγμα.
              </Typography>
              <CopyBlock
                text=
                {` 
import React, { useState } from 'react';

 function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
                  
     return (
        <div>
          <p>You clicked {count} times</p>
              <button onClick={() => setCount(count + 1)}>
                  Click me
              </button>
        </div>
         );
      }
           `}
                language="actionscript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Ας το πάρουμε βήμα-βήμα! Αρχικά βλέπουμε στον κώδικα την εξής εντολή :
              </Typography>
              <CopyBlock
                text=
                {` const [count, setCount] = useState(0); `}
                language="actionscript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Αυτό που κάνει αυτή η εντολή είναι να αρχικοποιεί μια μεταβλητή count, αντίστοιχη του state η οποία παίρνει
                την αρχική τιμή 0 λόγω του ορίσματος που βάλαμε στο useState. Αυτό που παρατηρούμε είναι ότι αρχικοποιείται και μια μέθοδος
                στην συγκεκριμένη περίπτωση που την ονομάζουμε setCount και θα λειτουργεί όπως η setState που μάθαμε προηγουμένως αλλά <span style={{ textDecoration: 'underline'}}> μόνο</span> για την
                μεταβλητή count.
              </Typography>
               <Typography variant="subtitle1" style={{ marginBottom: '2%', width: '100%' }}>
                <CopyBlock
                  text=
                  {` <button onClick={() => setCount(count + 1)}> `}
                  language="actionscript"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
                Στην παραπάνω εντολή βλέπουμε πως χρησιμοποιείται η setCount για να αυξήσει κατά 1 την μεταβλητή count κάθε φορά που πατάμε 
                το κουμπί. H συνάρτηση setCount δέχεται ένα όρισμα και αυτό το όρισμα θα είναι η τιμή την οποία θα πάρει το state μας.

              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%',textAlign: 'justify', width: '100%' }}>
                Στο προηγούμενο μάθημα μελετήσαμε τις lifecycle μεθόδους. Στα functional component δεν μπορούμε να τις χρησιμοποιήσουμε. Γι' αυτό η React δημιούργησε
                την <span style={{ fontWeight: 'bold' }}> useEffect </span> η οποία είναι ένα hook. Αυτό το hook επιτρέπει να ορίσουμε ενα μπλοκ κώδικα και το πότε θέλουμε αυτό να εκτελείται.
                Με αυτόν τον τρόπο μπορούμε να προσομοιώσουμε κάποιες απο τις lifecycle μεθόδους. Ας δούμε ένα παράδειγμα :
              </Typography>
               <CopyBlock
                text=
                {`import React, { useState } from 'react';

 function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState([]);

    useEffect(() => {
      setCount(0)
    },[]);
                  
     return (
        <div>
          <p>You clicked {count} times</p>
              <button onClick={() => setCount(count + 1)}>
                  Click me
              </button>
        </div>
         );
      }
                  }
             `}
                language="actionscript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%',textAlign: 'justify', width: '100%' }}>
                Στο παραπάνω παράδειγμα φαίνεται η useEffect η οποία προσομοιώνει κατα κάποιο τρόπο
                την componentDidMount. Το πότε θα εκτελεστεί η useEffect προκύπτει απο το δεύτερο όρισμα που της περνάμε. Η React έχει ορίσει ότι
                η useEffect θα εκτελείται όταν αλλάξει κάποιο από τα dependencies (το δεύτερο όρισμα). Εμείς στο συγκεκριμένο παράδειγμα
                δεν έχουμε ορίσει κάποιο dependency και άρα  η React θεωρεί πως η useEffect
                θα εκτελεστεί μόνο όταν το component γίνει render και όταν
                καταστραφεί.
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Επειδή δεν προλαβαίνουμε να αναλύσουμε όλες τις λεπτομέρειες και όλα τα hook σε αυτό το μάθημα, μπορείτε να βρείτε περισσότερες
                πληροφορίες <a
                  className="App-link"
                  href="https://reactjs.org/docs/hooks-intro.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  εδώ
                </a>.
              </Typography>



              <div style={{ marginTop: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Όπως αναφέραμε προηγουμένως έχουμε αρχικοποιήσει για έσας ένα απλό πρότζεκτ που περιέχει το component Home και την βασική δομή ενός React πρότζεκτ.
                Πάρτε όσο χρόνο χρειάζεστε για να μελετήσετε τα αρχεία ώστε να καταλάβετε τι περιέχεται στο καθένα!
              </Typography>

              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                Τροποποιήστε το αρχείο Home.js στην γραμμή 10, έτσι ώστε να θέσετε το message
                σε <span style={{ fontStyle: 'italic' }}> Νέα Πανεπιστημίου Πατρών </span> χρησιμοποιώντας το  setMessage().

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
                  "/second.test.js": {
                    code: testAppCode1,
                    hidden: true
                  },
                  "/public/App.css": { code: appcss, hidden: true },
                  "index.js": indexFile,
                  "SetupTest.js": {
                    code: code,
                    hidden: true
                  },
                  "/Home.js": { code: componentCode, active: true }
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
          <Grid item xs={2} key="fot">
            <Button variant="contained" onClick={goBack} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
              ΠΙΣΩ
            </Button>
          </Grid>
          {completed && (
            <Grid item xs={2} key="fot1">
              <Button variant="contained" onClick={goNext} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
                επομενο
              </Button>
            </Grid>
          )}
          <Grid item xs={2} key="fot2">
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
                      <Typography style={{ marginTop: '2%', marginBottom: '5%' }} align="center" id="keep-mounted-modal-description" >
                        Τό αρχείο Home.js πρέπει να έχει την εξής μορφή :
                      </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                      <SyntaxHighlighter code={solutionCode} language="javascript" showLineNumbers={true} />
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
      const bool = await validityCheck('r3', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email,'r4');

        return {
          props: {
            completed
          },
        };
      } else {
        return {
          redirect: {
            destination: '/react/third',
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

