/* eslint-disable  react/no-unescaped-entities*/

import React, {
  useState, useEffect, useContext, useMemo,
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
import { validityCheck } from '../../Lib/dao';
import { CopyBlock, dracula } from "react-code-blocks";
import appcomponenthtml from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/appcomponent.html";
import appmodule from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/appmodule.js";
import appcomponentjs from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/appcomponent.js";
import helloworldhtml from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/helloworldhtml";
import testing from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/testing";
import appcss from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/app.css";
import HelloWorldServicejs from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/helloworldservice";
import Helloworldjs from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/helloworldcomponent";
import solutionfile from "!!raw-loader!../../components/AngularTutorial/fourthTutorial/solution";
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
import { checkLessonTaken } from '../../Lib/dao';
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
    router.push('/angular/third')
  }

  const goNext = () => {
    router.push('/angular/fifth')
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
      lessonName: 'a4',
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
      await router.push('/angular/fifth')
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
    const { files, activePath, setActiveFile, openFile, resetAllFiles } = sandpack;



    useEffect(() => {
      const unsubscribe = listen((msg) => {
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/src/app/app.component.html')
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
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Ηρθε η ώρα να εμβαθύνουμε στα Services </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Ήρθε η ώρα να γνωρίσετε πως χρησιμοποιούνται τα <span style={{ fontWeight: 'bold' }}>Services</span> της Angular js!
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Ενδέχεται να χρειαστεί να χρησιμοποιήσουμε κάποιο κομμάτι κώδικα σε πολλές σελίδες.
                Για παράδειγμα, μπορεί να είναι για σύνδεση δεδομένων που πρέπει να μοιραστεί σε όλα τα components. Αυτό
                επιτυγχάνεται με τη βοήθεια των Services.
                Με τα Services, μπορούμε να έχουμε πρόσβαση σε μεθόδους και ιδιότητες σε άλλα στοιχεία σε ολόκληρο το πρότζεκτ.
                Για να δημιουργήσουμε ένα Service, πρέπει να χρησιμοποιήσουμε την  εντολή :

              </Typography>
              <CopyBlock
                text={`ng generate service myservice `}
                language="typescript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Το Angular/cli θα ενημερώσει τους φακέλους του πρότζεκτ μας και θα δημιουργήσει
                το αρχείο myservice.service.ts που θα έχει την εξής μορφή:
              </Typography>
              <CopyBlock
                text={`import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
   })
   export class MyserviceService {
                
         constructor() { }
  }+`}
                language="typescript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Πλέον μπορούμε να το κάνουμε import σε όλα τα αρχεία και να το χρησιμοποιήσουμε. Ας δούμε ένα παράδειγμα. Έστω ότι έχουμε το
                εξής service.
              </Typography>
              <CopyBlock
                text={`import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
   })
   export class MyserviceService {
                
         constructor() { }

         calculate(a: number, b: numberer): number {
           return a+b;
         }
  }`}
                language="typescript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Το παραπάνω έχει μια απλή μέθοδο που υπολογίζει το άθροισμα δύο αριθμών. Για να χρησιμοποιήσουμε αυτήν την μέθοδο σε ένα άλλο component
                πρέπει να κάνουμε το εξής:
              </Typography>
              <CopyBlock
                text={`import { Component, OnInit } from '@angular/core';
                import { MyserviceService } from 'src/app/services/NewsServices';
                
@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
   styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
sum :  number; 
                
   constructor(private MyserviceService : MyserviceService) { }
       ngOnInit(): void {
         this.sum=this.MyserviceService.calculate(5,6);
          }       
 }`}
                language="typescript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%', marginTop: '1%' }}>
                Στο παραπάνω παράδειγμα βλέπουμε ότι μέσα στον constructor του component δηλώνουμε το service που κάναμε import και το
                χρησιμοποιούμε μέσω του keyword <span style={{ fontStyle: 'italic' }}>this</span>.
              </Typography>

              <div style={{ marginTop: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Έχουμε αρχικοποιήσει ένα απλό πρότζεκτ  Angular js. Πάρτε όσο χρόνο χρειάζεστε για να μελετήστε τις δομές των αρχείων.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα πρέπει να χρησιμοποιήσετε το service που σας έχουμε κάνει import με τον τρόπο που μάθατε
                και να θέσετε την τιμή της μεταβλητής στο return value της συνάρτησης getMessage() της helloworldservice.
              </Typography>

            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Angular js Tutorial  </Typography>
              <SandpackProvider template="angular" customSetup={{
                files: {
                  "/src/app/components/hello-world/hello-world.component.ts": { code: Helloworldjs, hidden: false,active: true },
                  "/src/app/components/hello-world/hello-world.component.html": { code: helloworldhtml, hidden: false },
                  "/src/app/components/hello-world/hello-world.component.css": { code: '', hidden: true },
                  "/src/app/app.component.css": { code: appcss, hidden: true },
                  "/src/app/services/hello-world.service.ts": { code: HelloWorldServicejs, hidden: true },
                  "/src/app/app.component.spec.ts": {
                    code: testing,
                    hidden: true
                  },
                  "/src/app/app.component.html": {
                    code: appcomponenthtml,
                    hidden: false,
                    active: false
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
                    <SandpackCodeEditor showLineNumbers={true} showTabs="true" customStyle={{marginTop: '0.5vh', height: '59.5vh',width: '400px' }}    > </SandpackCodeEditor>
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
                        Τό template του  hello-world.component.ts  πρέπει να έχει την εξής μορφή :
                      </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                      <SyntaxHighlighter code={solutionfile} language="typescript" showLineNumbers={true} />
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

      const bool = await validityCheck('a3', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email,'a4')
        return {
          props: {
            completed
          },
        };
      } else {
        return {
          redirect: {
            destination: '/angular/third',
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

