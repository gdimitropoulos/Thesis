import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import { Popconfirm } from 'antd';
import {
  Button,
  Grid,
  Modal,
  Container,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import { CopyBlock, dracula } from "react-code-blocks";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { red } from '@mui/material/colors';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import testAppCode from "!!raw-loader!../../Components/reactTutorial/SecondReactTutorial/tutorialApptest";
import Appcode from "!!raw-loader!../../Components/reactTutorial/SecondReactTutorial/tutorialApp";
import indexFile from "!!raw-loader!../../Components/reactTutorial/SecondReactTutorial/tutorialIndex";
import componentCode from "!!raw-loader!../../Components/reactTutorial/SecondReactTutorial/tutorialComponent";
import solutionCode from "!!raw-loader!../../Components/reactTutorial/SecondReactTutorial/solution";
import Cookies from 'js-cookie';
import { useActiveCode } from "@codesandbox/sandpack-react";
import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  Sandpack,
  SandpackThemeProvider,
  SandpackPreview,
  FileTabs,
  useSandpack,
  useSandpackNavigation,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import styles from '../../styles/Home.module.css'
import showNotification from '../../Lib/notification'
import { getAppCookies } from '../../Lib/utils'
import { Backspace } from '@mui/icons-material';
import { display } from '@mui/system';

let backspaces = 0;
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

  const handlecloseSolution = async () => {
    setshowSolution(false)
  }
  const handleCloseSuccess = async () => {
    console.log(moment().diff(time, 'seconds'));
    const bodyData = {
      time: moment().diff(time, 'seconds').toString(),
      backspaces: backspaces,
      tutorialName: 'secondreact',
      answer: answerShown
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
      await router.push('/react/third')
    }else{
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
    const { files, activePath, setActiveFile, openFile } = sandpack;
    const { refresh } = useSandpackNavigation();
    const { code, updateCode } = useActiveCode();
    useEffect(() => {
      const unsubscribe = listen((msg) => {
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/App.js')
          }
          statuses.push(event.data.test.status);
        }
        if (msg.event == 'total_test_end') {
          handleOpen();
        }


      });
      return unsubscribe;
    }, [listen]);

    useEffect(() => {

      window.addEventListener('keydown', (event) => {
        if (event.path[0].className == 'cm-content') {
          console.log(event);
          if (event.key == 'Backspace') {
            backspaces++;
          }
        }

      });
    }, []);

    const runTests = () => { dispatch({ type: 'run-all-tests' }); };

    const codee = files[activePath].code;

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
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '1%', marginTop: '5%', paddingTop: '3%', paddingBottom: '3%',paddingLeft: '2%', paddingRight: '2%' }}>
      <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
        <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4}  key="geo">
          <Card style={{ maxHeight: "80vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
          <div style={{ marginBottom: '2%' , height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
          <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> To πρώτο σας custom Component </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα  θα πρέπει να κάνετε import to πρώτο σας <span style={{ fontWeight: 'bold' }}> component </span>!
              </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                <span style={{ fontWeight: 'bold' }}>Σημείωση:</span> Θυμηθείτε πως με τον
                όρο <span style={{ fontWeight: 'bold' }}> component </span> εννοoύμε ένα επαναχρησιμοποιήσιμο κομμάτι
                κώδικα το οποίο μπορούμε να κάνουμε import όπου χρειάζεται.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Έχουμε αρχικοποιήσει για εσάς το HelloWorld.vue  το οποίο είναι το component που θα πρέπει να χρησιμοποιήσετε. Τώρα είναι λοιπόν η ώρα
                να εξηγήσουμε εκτενέστερα την δομή <span style={{ backgroundColor: '#f4f4f4' }}>{`<script>`}</span>
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', width: '100%' }}>
                Σε κάθε δομή <span style={{ backgroundColor: '#f4f4f4' }}>{`<script>`}</span> θα υπάρχει o κώδικας :
                <CopyBlock
                  text=
                  {` export default {
      name: 'Name of the Component',
      props: {  }
       }`}
                  language="javascript"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
                Σε αυτό τον κώδικα ουσιαστικά δηλώνουμε το component μας ώστε να είναι διαθέσιμο για το υπόλοιπο πρότζεκτ.
                Μέσα στο  <span style={{ backgroundColor: '#f4f4f4' }}>{`<script>`}</span>  tag γίνεται και το import των διαφόρων component με τον εξής
                τρόπο :
                <CopyBlock
                  text={` import MyComponent from '../components/MyComponent'`}
                  language="javascript"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
                Όλα τα imported components μπορούμε πλέον να τα χρησιμποιούμε μέσα στο  <span style={{ backgroundColor: '#f4f4f4' }}>{`<template>`} </span> tag :
                <CopyBlock
                  text={`<template>
  <MyComponent  />
</template>`}
                  language="html"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />


                Μια πολύ σημαντική έννοια είναι τα <span style={{ fontWeight: 'bold' }}>props</span>. Τα props είναι ουσιαστικά, δεδομένα που μπορούμε να περνάμε δυναμικά μέσα στο component
                όταν το κάλουμε σε κάποιo άλλο αρχείο και τα δηλώνουμε με τον εξής τρόπο :
                <CopyBlock
                  text=
                  {`export default {
  name: 'Name of the Component',
  props: { message: String }
}`} language="javascript"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
                Στο παραπάνω παράδειγμα δηλώνουμε  ως prop την μεταβλήτη message που πρέπει να  είναι τύπου string .
              </Typography>
              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                Για να χρησιμοποιήοσυμε τώρα αυτήν την μεταβλητή στο <span style={{ backgroundColor: '#f4f4f4' }}>{`<template>`} </span> tag μπορούμε να ακολουθήσουμε το παρακάτω παράδειγμα :
                <CopyBlock
                  text=
                  {`<template>
    <div>
     <p> {{ message }} </p> 
    </div>
 </template>
                `} language="html"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
              </Typography>


              <div style={{ marginTop: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Όπως αναφέραμε προηγουμένως έχουμε αρχικοποιήσει για έσας ένα απλό πρότζεκτ που περιέχει το component HelloWorld και την βασική δομή ενός Vue js πρότζεκτ.
                Πάρτε τον χρόνο σας να μελετήσετε τα αρχεία ώστε να καταλάβετε τι περιέχεται στο καθένα!
              </Typography>

              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                Τροποποιήστε το   <span style={{ backgroundColor: '#f4f4f4' }}>{`<template>`} </span> του App.vue έτσι ώστε να περνάτε ως prop στο Component HelloWorld
                το κείμενο Hello World .
              </Typography>

            </Card>
          </Grid>
         
          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%",height: '75vh' , width: '100%' }}>
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
                  },
                  "/Button.js": componentCode
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
                    <SimpleCodeViewer />
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
                    <div style={{ width: '100%' , display: 'flex', justifyContent: 'center'}}>
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
                    <div style={{ width: '100%' , display: 'flex', justifyContent: 'center'}}>
                      <BlockSharpIcon  styles={{ marginBottom: '20px' }} id="keep-mounted-modal-title"   sx={{ color: red[500] , fontSize: 80  }}  />
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
          <Grid item xs={10}></Grid>
          <Grid item xs={2} key="fot">
            <Popconfirm
              title={'Είστε σίγουρος ότι θέλετε να δείτε την απάντηση'}
              onConfirm={showSolutionModal}
              okText={'Ναι'}
              cancelText={'Οχι'}

            >

              <Button variant="contained" color="secondary" style={{ marginTop: '4%' , marginBottom: '5%' }}>
                Show solution
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
                        Τό αρχείο App.js πρέπει να έχει την εξής μορφή :
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

