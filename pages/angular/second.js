/* eslint-disable  react/no-unescaped-entities*/
import React, {
  useState, useEffect
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
import { CopyBlock, dracula } from "react-code-blocks";
import { validityCheck } from '../../Lib/dao';
import appcomponenthtml from "!!raw-loader!../../components/AngularTutorial/secondTutorial/appcomponent.html";
import appmodule from "!!raw-loader!../../components/AngularTutorial/secondTutorial/appmodule.js";
import appcomponentjs from "!!raw-loader!../../components/AngularTutorial/secondTutorial/appcomponent.js";
import helloworldhtml from "!!raw-loader!../../components/AngularTutorial/secondTutorial/helloworldhtml";
import testing from "!!raw-loader!../../components/AngularTutorial/secondTutorial/testing";
import appcss from "!!raw-loader!../../components/AngularTutorial/secondTutorial/app.css";
import Helloworldjs from "!!raw-loader!../../components/AngularTutorial/secondTutorial/helloworldcomponent";
import solutionfile from "!!raw-loader!../../components/AngularTutorial/secondTutorial/solution.js";
import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import { checkLessonTaken } from '../../Lib/dao';
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
    router.push('/angular/start');
  }
  const goNext = () => {
    router.push('/angular/third');
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
      lessonName: 'a2',
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
      await router.push('/angular/third')
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



  const SimpleCodeViewer = () => {
    const { sandpack, dispatch, listen } = useSandpack();
    const { files, activePath, setActiveFile, openFile } = sandpack;



    useEffect(() => {
      const unsubscribe = listen((msg) => {
        console.log(msg);
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/src/app/app.component.html')
          }
          statuses.push(event.data.test.status);
        }
        if (msg.event == 'total_test_end') {
          handleOpen();
        }


      });

      console.log("im listening")
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
      timeFinishingTest.push(moment());
      dispatch({ type: 'run-all-tests' });
    };


    return (
      <div style={{ width: '100%', height: '40px' }}>
        <Button variant="contained" color='primary' style={{ height: '40px', width: "100%", textAlign: 'center' }} onClick={runTests} > ελεγχοσ</Button>;
      </div>
    );
  };

  const code = `import '@testing-library/jest-dom';
      `

  return (


    <div style={{ height: '60%' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '1%', marginTop: '2%', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
        <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> To πρώτο σας custom Component </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα θα πρέπει να κάνετε import to πρώτο σας <span style={{ fontWeight: 'bold' }}> component</span>!
              </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                <span style={{ fontWeight: 'bold' }}>Σημείωση:</span> Θυμηθείτε πως με τον
                όρο <span style={{ fontWeight: 'bold' }}> component </span> εννοoύμε ένα επαναχρησιμοποιήσιμο κομμάτι
                κώδικα το οποίο μπορούμε να κάνουμε import όπου χρειάζεται.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Έχουμε αρχικοποιήσει για εσάς το hello-world το οποίο είναι το component που θα πρέπει να χρησιμοποιήσετε. Τώρα είναι λοιπόν η ώρα
                να εξηγήσουμε εκτενέστερα την δομή του.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Σε κάθε δομή <span style={{ backgroundColor: '#f4f4f4' }}>{`<script>`}</span> θα υπάρχει o κώδικας :
                <CopyBlock
                  text=
                  {` @Component({
    selector: 'app-myComponent',
     templateUrl: './myComponent.component.html',
    styleUrls: ['./myComponent.component.css']
 })`}
                  language="javascript"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
                Σε αυτό τον κώδικα ουσιαστικά δηλώνουμε το component μας ώστε να είναι διαθέσιμο για το υπόλοιπο πρότζεκτ μέσω του selector.
                Μέσα απο το   <span style={{ backgroundColor: '#f4f4f4' }}>templateUrl</span>   γίνεται και το import της Ηtml ενώ μέσα από
                το  <span style={{ backgroundColor: '#f4f4f4' }}>styleUrls</span> γίνεται import η css του component. Έτσι φρονίζει η angular να έχει
                οργανωμένα όλα τα αρχεία της. Κάθε component που αρχικοποιούμε πρέπει να δηλωθεί στο app.module και πλέον μπορούμε να το χρησιμοποιούμε
                απευθείας στην Ηtml ενός άλλου component με τον εξής τρόπο:
                <CopyBlock
                  text={`<appmyComponent> </appmyComponent>`}
                  language="html"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
                Η Angular μέσω του cli έχει φροντίσει να αυτοματοποιήσει τις διαδικασίες αρχικοποίησης των component και για αυτό αντί να γράφουμε
                όλα αυτα τα αρχεία κάθε φορά απο την αρχή, μπορούμε να τρέχουμε την εντολή <span style={{ backgroundColor: '#f4f4f4' }}> ng generate component myComponent</span>
                και η Angular θα τα ετοιμάσει όλα για εμάς!


                Μια πολύ σημαντική έννοια είναι τα <span style={{ fontWeight: 'bold' }}>props</span> που είναι
                ουσιαστικά, δεδομένα που μπορούμε να περνάμε δυναμικά μέσα στο component
                όταν το κάλουμε σε κάποιo άλλο αρχείο και δηλώνονται με τον εξής τρόπο:
                <CopyBlock
                  text=
                  {`import { Component, OnInit, Input } from '@angular/core';

                  @Component({
                    selector: 'app-myComponent',
                     templateUrl: './myComponent.component.html',
                    styleUrls: ['./myComponent.component.css']
                 })
                  })
                  export class myComponent implements OnInit {
                    @Input() myprop : string; 
                  
                    constructor() { }
                  
                    ngOnInit(): void {
                    }
                  
                  }`} language="javascript"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
                Στο παραπάνω παράδειγμα δηλώνουμε  ως prop την μεταβλήτη myprop η οποία  πρέπει να  είναι τύπου string.
              </Typography>
              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                Για να χρησιμοποιήσουμε τώρα αυτήν την μεταβλητή στην <span style={{ backgroundColor: '#f4f4f4' }}> Ηtml</span>  μπορούμε να ακολουθήσουμε το παρακάτω παράδειγμα :
                <CopyBlock
                  text=
                  {`<div>
    <h1 > {{ myprop }} </h1>
</div>
                `} language="html"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', width: '100%' }}>
                Για να περάσουμε μια τιμή στο prop όταν καλούμε το component, κάνουμε το εξής:
              </Typography>
              <CopyBlock
                text=
                {`<app-myComponent myprop="I am passing prop to myComponent"> </app-myComponent>
                `} language="html"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />


              <div style={{ marginTop: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Όπως αναφέραμε προηγουμένως έχουμε αρχικοποιήσει για έσας ένα απλό πρότζεκτ που περιέχει το component hello world και την βασική δομή ενός Angular js πρότζεκτ.
                Πάρτε τον χρόνο σας να μελετήσετε τα αρχεία ώστε να καταλάβετε τι περιέχεται στο καθένα!
              </Typography>

              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                Τροποποιήστε το <span style={{ fontWeight: 'bold' }}> app.component.html </span> έτσι ώστε να περνάτε ως prop στο Component hello-world
                το κείμενο Hello World.
              </Typography>

            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Angular js Tutorial  </Typography>
              <SandpackProvider template="angular" customSetup={{
                files: {
                  "/src/app/components/hello-world/hello-world.component.ts": { code: Helloworldjs, hidden: false },
                  "/src/app/components/hello-world/hello-world.component.html": { code: helloworldhtml, hidden: false },
                  "/src/app/components/hello-world/hello-world.component.css": { code: '', hidden: true },

                  "/src/app/app.component.css": { code: appcss, hidden: true },
                  "/src/app/app.component.spec.ts": {
                    code: testing,
                    hidden: true
                  },
                  "/src/app/app.component.html": {
                    code: appcomponenthtml,
                    hidden: false,
                    active: true
                  },
                  "/src/app/app.component.ts": { code: appcomponentjs, hidden: false },

                  "/src/app/app.module.ts": { code: appmodule, hidden: false },
                },
                dependencies: {
                  "babel-runtime": "latest"

                },
              }} entry>
                <SandpackThemeProvider  >
                  <SandpackLayout theme="codesandbox-dark">
                    <SandpackCodeEditor showLineNumbers={true} showTabs="true" customStyle={{ marginTop: '0.5vh', height: '59.5vh', width: '400px' }}    > </SandpackCodeEditor>
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
          <Grid item xs={completed?6:8}></Grid>
          <Grid item xs={2} key="fot">
            <Button variant="contained" onClick={goBack} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
              ΠΙΣΩ
            </Button>
          </Grid>
          {completed && (
            <Grid item xs={2} key="fot">
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
                        Τό template του  app.component.html  πρέπει να έχει την εξής μορφή :
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
      const bool = await validityCheck('a1', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email, 'a2')

        return {
          props: {
            completed
          },
        };
      } else {
        return {
          redirect: {
            destination: '/angular/info',
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

