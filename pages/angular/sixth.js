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
import { validityCheck, checkLessonTaken } from '../../Lib/dao';
import { CopyBlock, dracula } from "react-code-blocks";
import appcomponenthtml from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/appcomponenthtml";
import appmodule from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/appmodule";
import appcomponentjs from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/appcomponent";
import homecomponent from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/homecomponent";
import homecomponenthtml from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/homecomponenthtml";
import firstcomponent from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/firstcomponent";
import firstcomponenthtml from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/firstcomponenthtml.html";
import secondcomponent from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/secondcomponent";
import secondcomponenthtml from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/secondcomponenthtml";
import thirdcomponent from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/thirdcomponent";
import thirdcomponenthtml from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/thirdcomponenthtml";
import testing from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/testing";
import testing1 from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/testing1";
import testing2 from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/testing2";
import appcss from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/app.css";
import newservice from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/newservice";
import solutionfile from "!!raw-loader!../../components/AngularTutorial/sixthTutotorial/solution";
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

  const goBack = () => {
    router.push('/angular/fifth')
  }
  const goNext = () => {
    router.push('/angular/seventh')
  }

  const handlecloseSolution = async () => {
    setshowSolution(false)
  }
  const handleCloseSuccess = async () => {
    const bodyData = {
      time,
      backspaces: backspaces,
      lessonName: 'a6',
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
      await router.push('/angular/seventh')
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
            setActiveFile('/src/app/app.module.ts')
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
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Angular js Router</Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Aυτό το μάθημα  αποτελεί μια εισαγωγή στο Angular js <span style={{ fontWeight: 'bold' }}> Router</span>, το εργαλείο που κάνει τη Angular να είναι
                ένα Single Page Application Framework!
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Ένα από τα πιο ισχυρά χαρακτηριστικά των σύγχρονων εφαρμογών ιστού μιας σελίδας (SPA) είναι η δρομολόγηση. Οι
                σύγχρονες εφαρμογές μιας σελίδας, όπως μια εφαρμογή Angular, μπορούν να μεταβούν από σελίδα σε σελίδα από την
                πλευρά του πελάτη (χωρίς να ζητηθεί ο διακομιστής).

              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                H αρχικοποίηση του router στην Angular είναι αρκετά απλή. Αρχικοποιούμε το app.module.ts με τον εξής τρόπο:

              </Typography>
              <div>
                <CopyBlock
                  text={`import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';;
import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: ' ', component: HomeComponent },
  {path: 'about', component: AboutComponent },
 ];
                  
  @NgModule({
    declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
   ],
 imports: [
  BrowserModule,
  RouterModule.forRoot(routes)
   ],
  providers: [],
  bootstrap: [AppComponent]
  })
  export class AppModule { }
                  `}
                  language="typescript"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Ας το δούμε βήμα-βήμα. Πρώτα αρχικοποιούμε τα routes μας στην μεταβλητή <span style={{ fontStyle: 'italic' }}> routes</span>:
              </Typography>
              <div>
                <CopyBlock
                  text={`i
const routes: Routes = [
  {path: ' ', component: HomeComponent },
  {path: 'about', component: AboutComponent },
 ];
          `}
                  language="typescript"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Σε αυτήν την μεταβλητή δηλώνουμε τα paths και σε ποιό component αντιστοιχεί σε κάθε path. Το default component βρίσκεται
                στο " " path.
              </Typography>
              <div>
                <CopyBlock
                  text={`
  imports: [
      BrowserModule,
      RouterModule.forRoot(routes)
    ],
          `}
                  language="typescript"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Έπειτα για να προσθέσουμε αυτά τα routes στο πρότζεκτ μας χρησιμοποιούμε το  <span style={{ fontStyle: 'italic' }}>RouterModule</span> με τον τρόπο του παραπάνω
                παραδείγματος. Πλέον είμαστε σχεδόν έτοιμοι! To μόνο που μένει είναι να πάμε στο app.component.html και να το αρχικοποιήσουμε με τον εξής τρόπο:

              </Typography>
              <div>
                <CopyBlock
                  text={`<router-outlet> </router-outlet>`}
                  language="html"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>

              <Typography variant="subtitle1" style={{ marginBottom: '4%', marginTop: '4%', textAlign: 'justify', width: '100%' }}>
                Ο τρόπος για να πλοηγηθούμε απο σελίδα σε σελίδα είναι μέσω των
              </Typography>
              <div>
                <CopyBlock
                  text={` <a routerLink = "/"></a>  `}
                  language="html"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '4%', marginTop: '4%', textAlign: 'justify', width: '100%' }}>

              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '4%', textAlign: 'justify', width: '100%' }}>
                Για την ώρα μην ασχολειθείτε με τα  <span style={{ backgroundColor: '#f4f4f4' }}> {`routerLink`} </span>. Δεν πειράζει αν δεν καταλαβαίνετε τα πάντα,
                θα τα δούμε στο επόμενο μάθημα!

              </Typography>
              <div style={{ marginTop: '4%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Έχουμε αρχικοποιήσει ένα απλό πρότζεκτ. Πάρτε όσο χρόνο χρειάζεστε για να μελετήσετε τις δομές των αρχείων.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα πρέπει να αρχικοποιήσετε τα paths του route συμφωνα με τα components που σας έχουμε ήδη κάνει import. Θα χρειαστεί να
                τροποποιήσετε μόνο το αρχείο app.module.ts και τα paths θα πρέπει να έχουν την εξής μορφή:
              </Typography>
              <ul>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    To path  " " να περιέχει το component HomeComponent
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    To path  "first" να περιέχει το component FirstComponent
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    To path  "second" να περιέχει το component SecondComponent
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    To path  "third" να περιέχει το component ThirdComponent.
                  </Typography>
                </li>
              </ul>

            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Angular  Tutorial  6 / 7  </Typography>
              <SandpackProvider template="angular" customSetup={{
                files: {
                  "/src/app/app.module.ts": { code: appmodule, hidden: false, active: true},
                  "/src/app/components/home/home.component.ts": { code: homecomponent, hidden: false },
                  "/src/app/components/home/home.component.html": { code: homecomponenthtml, hidden: false },
                  "/src/app/components/home/home.component.css": { code: appcss, hidden: true },
                  "/src/app/components/first/first.component.ts": { code: firstcomponent, hidden: false },
                  "/src/app/components/first/first.component.html": { code: firstcomponenthtml, hidden: false },
                  "/src/app/components/first/first.component.css": { code: appcss, hidden: true },
                  "/src/app/components/second/second.component.ts": { code: secondcomponent, hidden: false },
                  "/src/app/components/second/second.component.html": { code: secondcomponenthtml, hidden: false },
                  "/src/app/components/second/second.component.css": { code: appcss, hidden: true },
                  "/src/app/components/third/third.component.ts": { code: thirdcomponent, hidden: false },
                  "/src/app/components/third/third.component.html": { code: thirdcomponenthtml, hidden: false },
                  "/src/app/components/third/third.component.css": { code: appcss, hidden: true },
                  "/src/app/app.component.css": { code: appcss, hidden: true },
                  "/src/app/services/news.service.ts": { code: newservice, hidden: false },
                  "/src/app/app.component.spec.ts": {
                    code: testing,
                    hidden: true
                  },
                  "/src/app/app1.component.spec.ts": {
                    code: testing1,
                    hidden: true
                  },
                  "/src/app/app2.component.spec.ts": {
                    code: testing2,
                    hidden: true
                  },
                  "/src/app/app.component.html": {
                    code: appcomponenthtml,
                    hidden: false,
                  },
                  "/src/app/app.component.ts": { code: appcomponentjs, hidden: false },

                 
                },
                dependencies: {
                  "babel-runtime": "latest",
                  "@angular/router": "12.2.11",

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
          <Grid item xs={completed ? 6 : 8}></Grid>
          <Grid item xs={2} key="fot1">
            <Button variant="contained" onClick={goBack} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
              ΠΙΣΩ
            </Button>
          </Grid>
          {completed && (
            <Grid item xs={2} key="fot2">
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
                        Τo αρχείο  app.module.ts  πρέπει να έχει την εξής μορφή :
                      </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                      <SyntaxHighlighter code={solutionfile} language="actionscript" showLineNumbers={true} />
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

      const bool = await validityCheck('a5', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email,'a6')
        return {
          props: {
            completed
          },
        };
      } else {
        return {
          redirect: {
            destination: '/angular/fifth',
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

