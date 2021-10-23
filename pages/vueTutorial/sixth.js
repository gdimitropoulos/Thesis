/* eslint-disable  react/no-unescaped-entities*/
import React, {
  useState, useEffect,
} from 'react';
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import Image from 'next/image'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CopyBlock, dracula } from "react-code-blocks";
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
import treePic from '../../public/routertree.png'
import mainfile from '!!raw-loader!../../components/VueTutorial/main'
import appfile from '!!raw-loader!../../components/VueTutorial/app'
import routerfile from '!!raw-loader!../../components/VueTutorial/router'
import appvue from "!!raw-loader!../../components/VueTutorial/sixthTutorial/appvue";
import mainjs from "!!raw-loader!../../components/VueTutorial/sixthTutorial/main";
import helloworld from "!!raw-loader!../../components/VueTutorial/sixthTutorial/news";
import testing from "!!raw-loader!../../components/VueTutorial/sixthTutorial/testing";
import homejs from "!!raw-loader!../../components/VueTutorial/sixthTutorial/home";
import routerjs from "!!raw-loader!../../components/VueTutorial/sixthTutorial/router";
import first from "!!raw-loader!../../components/VueTutorial/sixthTutorial/first";
import second from "!!raw-loader!../../components/VueTutorial/sixthTutorial/second";
import third from "!!raw-loader!../../components/VueTutorial/sixthTutorial/third";
import solutionfile from "!!raw-loader!../../components/VueTutorial/sixthTutorial/solution";
import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { validityCheck, checkLessonTaken } from '../../Lib/dao';
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
    if (statuses.includes('fail')) {
      setOpenFail(true);
    } else {
      setOpenSuccess(true);
    }
    statuses = [];
  }

  const goBack = () => {
    router.push('/vueTutorial/fifth')
  }

  const goNext = () => {
    router.push('/vueTutorial/seventh')
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

    if (event.path[0].className == 'cm-content') {
      if ((event.which > 46 && event.which < 91) || (event.which > 95 && event.which < 112) || (event.which > 183 && event.which < 230) || (event.which > 151 && event.which < 165)) {
        totalCharsWritten++;
        console.log('im here');
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


  const handlecloseSolution = async () => {
    setshowSolution(false)
  }
  const handleCloseSuccess = async () => {
    const bodyData = {
      time,
      backspaces: backspaces,
      lessonName: 'v6',
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
      await router.push('/vueTutorial/seventh')
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
          }
          statuses.push(event.data.test.status);
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
        <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Vue js Router</Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Aυτό το μάθημα  αποτελεί μια εισαγωγή στο Vue js Router, το εργαλείο που κάνει τη Vue να είναι ένα Single Page Application Framework!
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Ένα από τα πιο ισχυρά χαρακτηριστικά των σύγχρονων εφαρμογών ιστού μιας σελίδας (SPA) είναι η δρομολόγηση. Οι
                σύγχρονες εφαρμογές μιας σελίδας, όπως μια εφαρμογή Vue, μπορούν να μεταβούν από σελίδα σε σελίδα από την πλευρά του πελάτη (χωρίς να ζητηθεί ο διακομιστής). Το Vue Router είναι η επίσημη βιβλιοθήκη για την πλοήγηση
                σελίδων στις εφαρμογές Vue. Το Vue Router είναι απλό στη χρήση, αλλά πολύ ισχυρό !

              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Για να προσθέσουμε το router, αφού μεταβούμε στο directory του πρότζεκτ, θα τρέξουμε στο terminal την εντολή
                <span style={{ backgroundColor: '#f4f4f4' }}> vue add router</span>. Έπειτα το πρότζεκτ θα πρέπει να έχει την μορφή:

              </Typography>


              <div style={{ marginTop: 15 }}>
                <Image style={{ marginTop: 5 }} src={treePic} alt="Picture of the folders tree" />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Δημιουργείται ένας φάκελος με όνομα <span style={{ backgroundColor: '#f4f4f4' }}> views</span> μαζί με δύο αρχεία <span style={{ backgroundColor: '#f4f4f4' }}> About.vue</span> και <span style={{ backgroundColor: '#f4f4f4' }}> Home.vue</span>.
                Αυτά τα αρχεία αντιπροσωπεύουν τις σελίδες μας. Δημιουργείται επίσης ένα αρχείο με όνομα <span style={{ backgroundColor: '#f4f4f4' }}> router/index.js</span>.
                Αυτό το αρχείο περιέχει όλες τις διαμορφώσεις του δρομολογητή. Ας το ανοίξουμε!
              </Typography>
              <div>
                <CopyBlock
                  text={routerfile}
                  language="javascript"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '4%', marginTop: '4%', textAlign: 'justify', width: '100%' }}>

                Κάνουμε import τα <span style={{ backgroundColor: '#f4f4f4' }}> createRouter</span> και <span style={{ backgroundColor: '#f4f4f4' }}> createWebHistory</span> από τη βιβλιοθήκη <span style={{ backgroundColor: '#f4f4f4' }}> vue-router</span>.
                Στη συνέχεια, εισάγουμε το στοιχείο <span style={{ backgroundColor: '#f4f4f4' }}>Home</span> απο τις <span style={{ backgroundColor: '#f4f4f4' }}>views/Home.vue</span>. Στη <span style={{ fontStyle: 'italic' }}>γραμμή 3 </span>
                δηλώνουμε ένα πινακα που αποτελείται από μια σειρά αντικειμένων που ονομάζονται <span style={{ fontWeight: 'bold' }}>routes</span>. Αυτός ο πίνακας αντιπροσωπεύει τις
                διαδρομές μας στην εφαρμογή. Αυτά τα στοιχεία πίνακα ονομάζονται αντικείμενα διαδρομής (route objects) .
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '4%', textAlign: 'justify', width: '100%' }}>
                Το πρώτο αντικείμενο διαδρομής έχει ως path το "/" που σημαίνει ότι αυτό θα είναι το βασικό μας URL. Το property
                <span style={{ fontWeight: 'bold' }}> component </span> αντιπροσωπεύει το στοιχείο που θα αποδίδεται όταν ο χρήστης επισκεφθεί αυτήν τη διαδρομή.
                Τέλος, το property  <span style={{ fontWeight: 'bold' }}> name </span> αντιπροσωπεύει το όνομα της διαδρομής.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '4%', textAlign: 'justify', width: '100%' }}>
                Έπειτα θα πάμε στο main.js φάκελο και θα κάνουμε import το router που μόλις φτιάξαμε:
              </Typography>
              <div>
                <CopyBlock
                  text={mainfile}
                  language="javascript"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '4%', marginTop: '4%', textAlign: 'justify', width: '100%' }}>
                Ας δούμε τώρα το App.vue :
              </Typography>

              <div>
                <CopyBlock
                  text={appfile}
                  language="html"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '4%', textAlign: 'justify', width: '100%' }}>
                Για την ώρα μην ασχολειθείτε με τα  <span style={{ backgroundColor: '#f4f4f4' }}> {`<router-link>`} </span>. Δεν πειράζει αν δεν καταλαβαίνετε τα πάντα,
                θα τα δούμε στο επόμενο μάθημα !
                Αυτό που  χρειαζόμαστε για να έχουμε όλη την λογική του <span style={{ backgroundColor: '#f4f4f4' }}> router/index.js</span> στο πρότζεκτ μας, είναι
                είναι το <span style={{ backgroundColor: '#f4f4f4' }}> {`<router-view/>`} </span>. Πλέον όλα είναι έτοιμα και μπορούμε να ξεκινήσουμε να φτιάχνουμε τα
                δικά μας πρότζεκτ!
              </Typography>
              <div style={{ marginTop: '4%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Έχουμε αρχικοποιήσει ένα απλό πρότζεκτ. Πάρτε όσο χρόνο χρειάζεστε για να μελετήσετε τις δομές των αρχείων main.js, App.vue και router/index.js .
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα πρέπει να αρχικοποιήσετε τα paths του route συμφωνα με τα components που σας έχουμε ήδη κάνει import. Θα χρειαστεί να
                τροποποιήσετε μόνο τον φάκελο index.js και τα paths θα πρέπει να έχουν την εξής μορφή:
              </Typography>
              <ul>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    To path  "/" να περιέχει το component Home.vue
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    To path  "/first" να περιέχει το component First.vue
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    To path  "/second" να περιέχει το component Second.vue
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    To path  "/third" να περιέχει το component Third.vue
                  </Typography>
                </li>
              </ul>


            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", height: '75vh', width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js Tutorial  </Typography>

              <SandpackProvider template="vue" customSetup={{
                files: {
                  "/src/App.vue": appvue,
                  "/src/main.js": {
                    code: mainjs, active: false
                  },
                  "/tests/unit/app.spec.js": { code: testing, hidden: true },
                  "/src/components/News.vue": { code: helloworld, hidden: true },
                  "/src/views/Home.vue": { code: homejs, hidden: true },
                  "/src/views/First.vue": { code: first, hidden: true },
                  "/src/views/Second.vue": { code: second, hidden: true },
                  "/src/views/Third.vue": { code: third, hidden: true },
                  "/src/router/index.js": { code: routerjs, active: true }



                },
                dependencies: {
                  "babel-runtime": "latest",
                  "@vue/test-utils": "^2.0.0-rc.15",
                  "vue-jest": "latest",
                  "vue": "^3.2.19",
                  "vue-template-compiler": "latest",
                  "vue-loader": "latest",
                  "vue-router": "^4.0.11"

                },
              }} >
                <SandpackThemeProvider  >
                  <SandpackLayout theme="codesandbox-dark">
                    <SandpackCodeEditor showTabs="true" customStyle={{  marginTop: '0.5vh', height: '59.5vh', width: '400px' }}    > </SandpackCodeEditor>
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
            <Grid item xs={2} key="fot">
              <Button variant="contained" onClick={goNext} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
                επομενο
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
                        Τό router/index,js πρέπει να έχει την εξής μορφή :
                      </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                      <SyntaxHighlighter code={solutionfile} language="javascript" showLineNumbers={true} />
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


      const bool = await validityCheck('v5', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email, 'v6')
        return {
          props: {
            completed
          },
        };
      } else {
        return {
          redirect: {
            destination: '/vueTutorial/fifth',
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

