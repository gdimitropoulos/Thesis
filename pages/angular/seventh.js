/* eslint-disable  react/no-unescaped-entities*/
import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import { Popconfirm } from 'antd';
import {
  Button,
  Grid,
  Modal,
  Container,
  Tab,
  Tabs,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import appcomponenthtml from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/appcomponenthtml";
import appmodule from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/appmodule";
import appcomponentjs from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/appcomponent";
import homecomponent from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/homecomponent";
import homecomponenthtml from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/homecomponenthtml";
import firstcomponent from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/firstcomponent";
import firstcomponenthtml from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/firstcomponenthtml";
import secondcomponent from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/secondcomponent";
import secondcomponenthtml from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/secondcomponenthtml";
import thirdcomponent from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/thirdcomponent";
import thirdcomponenthtml from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/thirdcomponenthtml";
import testing from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/testing";
import testing1 from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/testing1";
import testing2 from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/testing2";
import appcss from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/app.css";
import newservice from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/newservice";
import solutionfile from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/solution";
import solutionfile1 from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/solution1";
import solutionfile2 from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/solution2";
import solutionfile3 from "!!raw-loader!../../components/AngularTutorial/seventhTutorial/solution3";
import { CopyBlock, dracula } from "react-code-blocks";

import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image'
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

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


export default function Start() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [writeFlag, setWriteFlag] = useState(0);
  const [totalTries, setTotalTries] = useState(0);
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
      lessonName: 'a7',
      tutorailName:'react',
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
      await router.push('/angular/fourth')
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
            <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Angular js RouterLinks</Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
              Θα ολοκληρώσουμε αυτο το εισαγωγικό σύνολο μαθημάτων στην Angular js κάνοντας μια αναφορά και
              στα <span style={{ fontWeight: 'bold' }}> routerLinks </span> ώστε να συμπληρώσουμε τις γνώσεις σας για το routing της Angular!
            </Typography>

            <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
              Ο τρόπος για να χρησιμοποιήσουμε τα route  paths που φτιάξατε στο προηγούμενο μάθημα είναι μέσω των
              <span style={{ backgroundColor: '#f4f4f4' }}> { `<a routerLink = "/"></a>`}</span>. Στα
              <span style={{ backgroundColor: '#f4f4f4' }}> {`<a routerLink = "/"></a>`}</span> tags μπορούμε να θέσουμε  την ιδιότητα
              <span style={{ backgroundColor: '#f4f4f4' }}> routerLink </span> σε κάποιο url  για να υποδείξουμε σε ποιό path θα θέλαμε να μεταβούμε. Ας δούμε ένα παράδειγμα:
            </Typography>
            <div>
              <CopyBlock
                text={`<a routerLink = "about"> About</a>`}
                language="html"
                showLineNumbers={false}
                theme={dracula}
                codeBlock
              />
            </div>
            <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
              Στο παράδειγμα  αυτό αν κάποιος πατήσει στο σύνδεσμο, θα πλοηγηθεί στην σελίδα που έχει συνδεθεί με το url /about.
            </Typography>


            <div style={{ marginTop: '4%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
            <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

              Έχουμε αρχικοποιήσει ένα απλό πρότζεκτ. Πάρτε όσο χρόνο χρειάζεστε για να μελετήσετε τις δομές των αρχείων.
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
              Σε αυτό το μάθημα πρέπει να προσθέσετε τα κατάλληλα <span style={{ fontWeight: 'bold' }}> {`<a router-links></a>`} </span>
               έτσι ώστε :
            </Typography>
            <ul>
              <li>
                <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                  Στο home.component.html θα πρέπει να προσθεθούν τα links ώστε κάθε
                  φορά που πατάει κάποιος τον σύνδεσμο να μεταφέρεται στο target property που περιέχει ο πίνακας messages
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                  Στo  first.component.html να προστεθεί link που σε μεταφέρει στην αρχικη σελίδα (path = '')
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                  Στo  second.component.html να προστεθεί link που σε μεταφέρει στην αρχικη σελίδα (path = '')
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                  ΣTo third.component.html να προστεθεί link που σε μεταφέρει στην αρχικη σελίδα (path = '')
                </Typography>
              </li>
            </ul>
            <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
              <span style={{ fontWeight: 'bold' }}> Σημείωση: </span> πρέπει να τροποποιήσετε τα αρχεία home.component.html, first.component.html,
                second.component.html και third.component.html.
            </Typography>
            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Angular js Tutorial  </Typography>
              <SandpackProvider template="angular" customSetup={{
                 files: {
                  "/src/app/components/home/home.component.ts": {code:  homecomponent, hidden : false},
                  "/src/app/components/home/home.component.html": {code:  homecomponenthtml, hidden : false},
                  "/src/app/components/home/home.component.css": {code:  appcss, hidden : true},
                  "/src/app/components/first/first.component.ts": {code:  firstcomponent, hidden : false},
                  "/src/app/components/first/first.component.html": {code:  firstcomponenthtml, hidden : false},
                  "/src/app/components/first/first.component.css": {code:  appcss, hidden : true},
                  "/src/app/components/second/second.component.ts": {code:  secondcomponent, hidden : false},
                  "/src/app/components/second/second.component.html": {code:  secondcomponenthtml, hidden : false},
                  "/src/app/components/second/second.component.css": {code:  appcss, hidden : true},
                  "/src/app/components/third/third.component.ts": {code:  thirdcomponent, hidden : false},
                  "/src/app/components/third/third.component.html": {code:  thirdcomponenthtml, hidden : false},
                  "/src/app/components/third/third.component.css": {code:  appcss, hidden : true},
                  "/src/app/app.component.css": {code:  appcss, hidden : true},
                  "/src/app/services/news.service.ts": {code:  newservice, hidden : false},
                  "/src/app/app.component.spec.ts": {
                    code: testing,
                    hidden: true
                  },
                 
                 "/src/app/components/second/second.component.spec.ts": {
                    code: testing1,
                    hidden: true
                  },
                  
                  "/src/app/app.component.html": {
                      code: appcomponenthtml,
                      hidden: false,
                      active: true
                    },
                    "/src/app/app.component.ts": {code: appcomponentjs, hidden: false},

                  "/src/app/app.module.ts": {code: appmodule, hidden: false},
                  "/src/app/components/third/third.component.spec.ts": {
                    code: testing2,
                    hidden: true
                  },
                                   },
                dependencies: {
                  "babel-runtime": "latest",
                  "@angular/router": "latest",
                },
              }} entry>
                <SandpackThemeProvider  >
                  <SimpleCodeViewer />
                  <SandpackLayout theme="codesandbox-dark">
                    <SandpackCodeEditor showLineNumbers={true} showTabs="true" customStyle={{ marginTop: '10px', height: '500px', width: '400px' }}    > </SandpackCodeEditor>
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
          <Grid item xs={10}></Grid>
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

                      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="p" style={{ width: '100%', marginTop: '2%', marginBottom: '5%' }} align="center" id="keep-mounted-modal-description" >
                          Τα αρχεία First.js, Second.js και Third.js πρέπει να έχουν την παρακάτω μορφή:
                        </Typography>
                      </div>

                      <div>
                        <Box sx={{ width: '100%', marginTop: '4%' }}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example" indicatorColor="primary"
                              textColor="primary">
                              <Tab label="First.js" {...a11yProps(0)} />
                              <Tab label="Second.js" {...a11yProps(1)} />
                              <Tab label="Third.js" {...a11yProps(2)} />
                              <Tab label="Home.js" {...a11yProps(3)} />
                            </Tabs>
                          </Box>
                          <TabPanel value={value} index={0}>
                            <SyntaxHighlighter code={solutionfile} language="actionscript" showLineNumbers={true} />
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            <SyntaxHighlighter code={solutionfile1} language="actionscript" showLineNumbers={true} />
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            <SyntaxHighlighter code={solutionfile2} language="actionscript" showLineNumbers={true} />
                          </TabPanel>
                          <TabPanel value={value} index={3}>
                            <SyntaxHighlighter code={solutionfile3} language="actionscript" showLineNumbers={true} />
                          </TabPanel>
                        </Box>
                      </div>




                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Button size="large" style={{ borderRadius: '50%', width: '40%', marginBottom: '1%', marginTop: '5%' }} variant="contained" color="primary" onClick={handlecloseSolution}>CLOSE</Button>
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

