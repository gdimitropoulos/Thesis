import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  TextField,
  Grid,
  Item,
  Paper,
  Modal,
  Container,
  AppBar,
  Typography,
  Toolbar,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  Box,
  FormControlLabel,
} from "@material-ui/core";
import testAppCode from "!!raw-loader!../../Components/FirstReactTutorial/ApprealTest";
import Appcode from "!!raw-loader!../../Components/FirstReactTutorial/Apptest";
import indexFile from "!!raw-loader!../../Components/FirstReactTutorial/indexFiles";
import Cookies from 'js-cookie';
import { useActiveCode } from "@codesandbox/sandpack-react";
import { Layout } from 'antd';
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

export default function Start() {
  const { Sider, Content } = Layout;
  const router = useRouter();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  let statuses = [];
  const handleOpen = () => {
    console.log(statuses)
    console.log('statuses')
    if(statuses.includes('fail')){
      setOpenFail(true);
    }else{
      setOpenSuccess(true);
    }
    statuses=[];
  }
  const handleCloseSuccess = () => setOpenSuccess(false);
  const handleCloseFail = () => setOpenFail(false);

  const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    height: '60vh',
    bgcolor: 'background.paper',
    borderRadius: '10%',
    boxShadow: 24,
    p: 4,
  };


  const SimpleCodeViewer = () => {
    const { sandpack, dispatch, listen } = useSandpack();
    const { files, activePath, setActiveFile, openFile } = sandpack;
    const { refresh } = useSandpackNavigation();
    const { code, updateCode } = useActiveCode();
    

    useEffect(() => {
      window.addEventListener('keydown',(event) => {
        console.log(event);
      });

      window.addEventListener('message', (event) => {
        if (event.data.event == 'test_end') {
          if (event.data.test.status == 'fail') {
            dispatch({ type: 'refresh' });
          }
          statuses.push(event.data.test.status);
        }
        if(event.data.event =='total_test_end'){
          handleOpen();
        }

      });
    }, []);

    const handleRefresh = () => {
      // listens for any message dispatched between sandpack and the bundler
      // sends the refresh message to the bundler, should be logged by the listener
      dispatch({ type: 'run-all-tests' });

      // unsubscribe
    };
    useEffect(() => {
     
    }, [sandpack]);

    const codee = files[activePath].code;
    // console.log(codee);
    //onClick={()=>{ refresh() }}
    return (
      <div style={{ width: '100%', height: '40px' }}>
        <Button variant="contained" color='primary' style={{ height: '40px', width: "100%", textAlign: 'center' }} onClick={handleRefresh} > Run Tests  </Button>;
      </div>
    );
  };

  

  return (

    <div style={{ height: '60%' }}>
      <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '1%', marginTop: '5%', paddingTop: '3%', paddingBottom: '3%' }}>
        <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item xs={12} key="geo">
            <Card style={{ maxHeight: "80%", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <Typography variant="overline" style={{ width: '100%', marginBottom: '2%' }}>  Say Hello with React Js  </Typography>
              <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}>  Καλώς ήρθατε στο tutorial της react! </Typography>
              <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}> Στο πρώτο στάδιο σας ζητειται να συμπληρώσετε στο αρχείο App.js
                έτσι ώστε να τυπώνεται το μήνυμα Hello World! </Typography>
              <Typography variant="subtitle1" style={{ width: '100%' }}> Στα αρχεία index.js και App.js βλέπουμε την αρχική κατάσταση που βρίσκοντα
                τα αρχεία μετά την εκτέλεση του create-react-app που είναι ο ποιο δημοφιλής αρχικοποιητής του react js.Μπορούμε να παρατηρήσουμε ότι η React λειτουργεί με components τα οποία γίνονται
                render σε ένα html αρχείο το οποίο αυτήν την στιγμή για λόγους ευχρήστιας δεν σας δείχνουμε. </Typography>

            </Card>
          </Grid>
          <Grid item xs={12} key="fot">
            <Card style={{ padding: "1%", width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   React Tutorial  </Typography>

              <SandpackProvider template="react" customSetup={{
                files: {
                  // "/index.js": code,
                  //"/Test.js":testCode,
                  //"/QuickSort.js": quicksortCode,
                  //"/BubbleSort.js": bubblesortCode,
                  //"/index.html": `<div id="root"></div>`
                  "/App.js": Appcode,
                  "/App.test.js": testAppCode,
                  "index.js": indexFile,
                  "SetupTest.js":

                    `import '@testing-library/jest-dom';

                                    `

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
                onClose={handleCloseSuccess}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                                  <Card>

                <Box sx={style}>
                  <Typography  id="keep-mounted-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  YOU PASSED THE TEST 
                  </Typography>
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
                                  <Card styles={{ padding: '1%'}}>

                <Box sx={style} >
                  <Typography  align="center" styles={{ marginBottom: '20px'}} id="keep-mounted-modal-title" variant="h6" component="h2">
                    Text in a modal
                    
                  </Typography>
                  <Box style={{ display: 'flex', justifyContent: 'space-around', flexDirection : 'column'}}>
                  <Typography style={{ marginTop: '2%'}} align="center" id="keep-mounted-modal-description" >
            H απάντηση που δώσατε ήταν λανθασμένη 
                               </Typography>
                            <Button style={{ marginTop: '10%'}} variant="contained" color="primary" onClick={handleCloseFail}> Προσπαθηστε ξανα</Button>
                            </Box>
                </Box>
                </Card>

              </Modal>


            </Card>
          </Grid>
        </Grid>
      </Container>
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
        props: {},
      };

      /*)
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
        */
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

