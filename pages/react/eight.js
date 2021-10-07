import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import { red } from '@mui/material/colors';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import testAppCode from "!!raw-loader!../../Components/reactTutorial/eightTutorial/tutorialAppTest";
import testAppCode1 from "!!raw-loader!../../Components/reactTutorial/eightTutorial/tutorialAppTest1";
import testAppCode2 from "!!raw-loader!../../Components/reactTutorial/eightTutorial/tutorialAppTest2";
import Appcode from "!!raw-loader!../../Components/reactTutorial/eightTutorial/tutorialApp";
import indexFile from "!!raw-loader!../../Components/reactTutorial/eightTutorial/tutorialIndex";
import componentCode from "!!raw-loader!../../Components/reactTutorial/eightTutorial/tutorialComponent";
import appcss from "!!raw-loader!../../Components/reactTutorial/eightTutorial/App.css";
import news from "!!raw-loader!../../Components/reactTutorial/eightTutorial/News";
import first from "!!raw-loader!../../Components/reactTutorial/eightTutorial/First";
import second from "!!raw-loader!../../Components/reactTutorial/eightTutorial/Second";
import third from "!!raw-loader!../../Components/reactTutorial/eightTutorial/Third";
import solutionCode from "!!raw-loader!../../Components/reactTutorial/eightTutorial/solution";
import solutionCode1 from "!!raw-loader!../../Components/reactTutorial/eightTutorial/solution1";
import solutionCode2 from "!!raw-loader!../../Components/reactTutorial/eightTutorial/solution2";
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
  width: '60vw',
  height: '80vh',
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

export default function Eight() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
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
      tutorialName: 'sixthreact',
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
      await router.push('/react/sixth')
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
    const { files, activePath, setActiveFile, openFile } = sandpack;
    const { refresh } = useSandpackNavigation();
    const { code, updateCode } = useActiveCode();


    useEffect(() => {

      window.addEventListener('keydown', (event) => {
        if (event.path[0].className == 'cm-content') {
          console.log(event);
          if (event.key == 'Backspace') {
            backspaces++;
          }
        }

      });
      window.addEventListener('message', (event) => {
        console.log(event)
        if (event.data.event == 'test_end') {
          if (event.data.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/App.js')
          }
          statuses.push(event.data.test.status);
        }
        if (event.data.event == 'total_test_end') {
          handleOpen();
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
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '1%', marginTop: '5%', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
        <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "80vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <Typography variant="overline" style={{ width: '100%', marginBottom: '2%' }}> React Js Tutorial  </Typography>
              <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}>  Βήμα 2ο </Typography>
              <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}> Στο δεύτερο  στάδιο σας ζητειται να συμπληρώσετε στο αρχείο App.js
                έτσι ώστε να να κάνετε import ένα το react component που βρισκεται στο button.js φάκελο  </Typography>
              <Typography variant="subtitle1" style={{ width: '100%' }}>
                Όπως είδαμε και στο πρώτο στάδιο το React χρησιμοποιεί τα λεγόμενα component για να έχει επαναχρησιμότηττα στον κώδικα ο χρήστης. Ένα react component είναι ένα κομμάτι κώδικα που μπορείς να αρχικοποιήσεις και μετά να το καλέις παντού στον πρότζεκτ σου </Typography>

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
                  "/App.js": { code: Appcode, active: true },
                  "/App.test.js": {
                    code: testAppCode,
                    hidden: true
                  },
                  "/Second.test.js": {
                    code: testAppCode1,
                    hidden: true
                  },
                  "/Third.test.js": {
                    code: testAppCode2,
                    hidden: true
                  },
                  "/public/App.css": { code: appcss, hidden: true },
                  "index.js": indexFile,
                  "/News.js": { code: news, active: true },
                  "SetupTest.js": {
                    code: code,
                    hidden: true
                  },
                  "/Home.js": { code: componentCode, active: false },
                  "/First.js": { code: first },
                  "/Second.js": { code: second },
                  "/Third.js": { code: third },
                },
                dependencies: {
                  "react-markdown": "latest",
                  "jest-matchers": "latest",
                  "history": "latest",
                  "react-dom": "latest",
                  "react-test-renderer": "latest",
                  "react-router-dom": "latest",
                  "babel-runtime": "latest",
                  "@testing-library/jest-dom": "^5.14.1",
                  "@testing-library/react": "^11.2.7",
                  "@testing-library/user-event": "^12.8.3",
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

              <Button variant="contained" color="secondary" style={{ marginTop: '4%', marginBottom: '5%' }}>
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

                      <div style={{ width: '100%',display: 'flex', justifyContent:'center' }}>
                        <Typography  variant="p" style={{ width:'100%', marginTop: '2%', marginBottom: '5%' }} align="center" id="keep-mounted-modal-description" >
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
                            </Tabs>
                          </Box>
                          <TabPanel value={value} index={0}>
                            <SyntaxHighlighter code={solutionCode} language="javascript" showLineNumbers={true} />
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            <SyntaxHighlighter code={solutionCode1} language="javascript" showLineNumbers={true} />
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            <SyntaxHighlighter code={solutionCode2} language="javascript" showLineNumbers={true} />
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
    </div >
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

