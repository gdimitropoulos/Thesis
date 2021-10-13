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
    Typography,
    Card,
    Box,
  } from "@material-ui/core";

  import appcomponenthtml from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/appcomponenthtml";
  import appmodule from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/appmodule";
  import appcomponentjs from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/appcomponent";
  import homecomponent from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/homecomponent";
  import homecomponenthtml from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/homecomponenthtml";
  import firstcomponent from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/firstcomponent";
  import firstcomponenthtml from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/firstcomponenthtml";
  import secondcomponent from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/secondcomponent";
  import secondcomponenthtml from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/secondcomponenthtml";
  import thirdcomponent from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/thirdcomponent";
  import thirdcomponenthtml from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/thirdcomponenthtml";
  import testing from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/testing";
  import appcss from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/app.css";
  import newservice from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/newservice";
  import solutionfile from "!!raw-loader!../../Components/AngularTutorial/seventhTutorial/solution";
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
        tutorialName: 'thirdangular',
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
    <div style={{ height: '80%', marginBottom: '1%', marginTop: '2%', paddingTop: '2%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
      <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
        <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
          <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
                <div style={{ marginBottom: '2%' , height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
                <Typography variant="h6" style={{ marginBottom: '2%' ,width: '100%', marginBottom: '1%' }}> To πρώτο σας Hello World </Typography>
                <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                  Ήρθε η ώρα να γνωρίσετε την Vue js στην πράξη!
                </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: '2%' , textAlign: 'justify', width: '100%' }}>
                   Για αρχή θα εκτυπώσουμε στην οθόνη ένα απλό μήνυμα "Hello World" με βάση όσα γνωρίζετε απο την απλή Html.
                </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: '2%' , textAlign: 'justify', width: '100%' }}>
                   Έχουμε αρχικοποιήσει για έσας ένα απλό πρότζεκτ ακολουθώντας όσα αναφέραμε προηγουμένως. Από τα αρχεία στα οποία αναφερθήκαμε συνοπτικά
                   στα προηγούμενα μαθήματα, εμφανίζονται μόνο όσα  απαιτούν τροποποιήσεις από εσάς ή κρίνονται απαραίτητα  ώστε να γνωρίσετε την Vue js σε ένα εισαγωγικό επίπεδο.
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%',marginTop: '1%' }}>
                   Στα δεξιά βλέπετε το αρχείο App.vue του οποίου η δομή {`<template>`} είναι αρχικοποιημένη με απλή Html. Όσα γνωρίζετε από την Html
                   μπορούν να χρησιμοποιηθούν και στην Vue! 
                </Typography>
  
  
                <div style={{ marginTop: '2%' , height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
                <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                  Τροποποιήστε  τον κώδικα στη γραμμή 4 ώστε να εκτυπώνεται το κείμενο Hello World  και πατήστε Run Tests.
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
                    "/src/app/app.component.html": {
                        code: appcomponenthtml,
                        hidden: false,
                        active: true
                      },
                      "/src/app/app.component.ts": {code: appcomponentjs, hidden: false},

                    "/src/app/app.module.ts": {code: appmodule, hidden: false},
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
                        <Typography style={{ marginTop: '2%', marginBottom: '5%' }} align="center"  >
                          Τό template του  App.vue  πρέπει να έχει την εξής μορφή :
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
  
  