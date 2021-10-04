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
    Typography,
    Card,
    Box,
  } from "@material-ui/core";
  import appvue from "!!raw-loader!../../Components/vueTutorial/fourthTutorial/appvue";
  import mainjs from "!!raw-loader!../../Components/vueTutorial/fourthTutorial/main";
  import helloworld from "!!raw-loader!../../Components/vueTutorial/fourthTutorial/home";
  import testing from "!!raw-loader!../../Components/vueTutorial/fourthTutorial/testing";
  import solutionfile from "!!raw-loader!../../Components/vueTutorial/fourthTutorial/solution";
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
      const bodyData ={
        time: moment().diff(time, 'seconds').toString(),
        backspaces: backspaces,
        tutorialName: 'fourthvue' ,
        answer : answerShown
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
        await router.push('/vueTutorial/fifth')
      }else{
        showNotification(
          'error',
          'Σφάλμα ',
          'Κάτι πήγε στραβά'
        );
      }
    };
    const handleCloseFail = () => setOpenFail(false);
    const showSolutionModal = () => {setshowSolution(true); setAnswerShown(true)}
    const correctAnswer= `  import React from "react";
  
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
      const unsubscribe  = listen((msg) => {
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
  
      const runTests = () => {dispatch({type: 'run-all-tests' });};
  
  
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
           <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
                <Typography variant="overline" style={{ width: '100%', marginBottom: '2%' }}>  Say Hello with React Js  </Typography>
                <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}>  Καλώς ήρθατε στο tutorial της react! </Typography>
                <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}> Στο πρώτο στάδιο σας ζητειται να συμπληρώσετε στο αρχείο App.js
                  έτσι ώστε να τυπώνεται το μήνυμα Hello World! </Typography>
                <Typography variant="subtitle1" style={{ width: '100%' }}> Στα αρχεία index.js και App.js βλέπουμε την αρχική κατάσταση που βρίσκοντα
                  τα αρχεία μετά την εκτέλεση του create-react-app που είναι ο ποιο δημοφιλής αρχικοποιητής του react js.Μπορούμε να παρατηρήσουμε ότι η React λειτουργεί με components τα οποία γίνονται
                  render σε ένα html αρχείο το οποίο αυτήν την στιγμή για λόγους ευχρήστιας δεν σας δείχνουμε. </Typography>
  
              </Card>
          </Grid>
            <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", height:'75vh', width: '100%' }}>
                <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js  Tutorial  </Typography>
  
                <SandpackProvider template="vue"  customSetup={{
                files: {
                  "/src/App.vue": { code: appvue, active: false},
                  "/src/main.js": {
                    code: mainjs,
                    hidden: true
                  },
                  "/tests/unit/app.spec.js": {code: testing, hidden: true},
                  "/src/components/Home.vue": {code : helloworld, active: true},

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
            <Grid item xs={10}>

            </Grid>
            <Grid item xs={2} key="fot">
            <Popconfirm
                          title={'Είστε σίγουρος ότι θέλετε να δείτε την απάντηση'}
                          onConfirm={showSolutionModal}
                          okText={'Ναι'}
                          cancelText={'Οχι'}
             
                      >
                      
                              <Button variant="contained" color= "secondary" style={{ marginTop: '4%', marginBottom: '5%'}}>
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
                      <Typography style={{ marginTop: '2%', marginBottom: '5%' }} align="center"  >
                        {"Τό <script> του  App.vue  πρέπει να έχει την εξής μορφή :"}
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
  
  