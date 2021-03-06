/* eslint-disable  react/no-unescaped-entities*/
import React, {
  useState, useEffect,
} from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import { red } from '@mui/material/colors';
import { Popconfirm } from 'antd';
import {
  Button,
  Grid,
  Modal,
  Tab,
  Tabs,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import { validityCheck, checkLessonTaken } from '../../Lib/dao';
import { CopyBlock, dracula } from "react-code-blocks";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import testAppCode from "!!raw-loader!../../components/reactTutorial/eightTutorial/tutorialAppTest";
import testAppCode1 from "!!raw-loader!../../components/reactTutorial/eightTutorial/tutorialAppTest1";
import testAppCode2 from "!!raw-loader!../../components/reactTutorial/eightTutorial/tutorialAppTest2";
import Appcode from "!!raw-loader!../../components/reactTutorial/eightTutorial/tutorialApp";
import indexFile from "!!raw-loader!../../components/reactTutorial/eightTutorial/tutorialIndex";
import componentCode from "!!raw-loader!../../components/reactTutorial/eightTutorial/tutorialComponent";
import appcss from "!!raw-loader!../../components/reactTutorial/eightTutorial/App.css";
import news from "!!raw-loader!../../components/reactTutorial/eightTutorial/News";
import first from "!!raw-loader!../../components/reactTutorial/eightTutorial/First";
import second from "!!raw-loader!../../components/reactTutorial/eightTutorial/Second";
import third from "!!raw-loader!../../components/reactTutorial/eightTutorial/Third";
import solutionCode from "!!raw-loader!../../components/reactTutorial/eightTutorial/solution";
import solutionCode1 from "!!raw-loader!../../components/reactTutorial/eightTutorial/solution1";
import solutionCode2 from "!!raw-loader!../../components/reactTutorial/eightTutorial/solution2";
import { useActiveCode } from "@codesandbox/sandpack-react";
import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackPreview,
  useSandpack,
  useSandpackNavigation,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import styles from '../../styles/Home.module.css'
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
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Eight({ completed }) {
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
    if (statuses.includes('pass') && !statuses.includes('fail') ) {
      setOpenSuccess(true);

    } else {
      setOpenFail(true);
    }
    statuses = [];
  }
  const goBack = () => {
    router.push('/react/sixth')
  }
  const goNext = () => {
    router.push('/user/dashboard')
  }
  const pasteHandler = (event) => {
    if (event.path.length > 15) {
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
  const handlecloseSolution = async () => {
    setshowSolution(false)
  }
  const handleCloseSuccess = async () => {
    const bodyData = {
      time,
      backspaces: backspaces,
      lessonName: 'r7',
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
    if (res.status === 200) {
      showNotification(
        'success',
        '???????????????? ?????????????????? ',
        '???????????????? ?????????????????? ?????? ??????????????????????'
      );
      await router.push('/user/dashboard')
    } else {
      showNotification(
        'error',
        '???????????? ',
        '???????? ???????? ????????????'
      );
    }
    setOpenSuccess(false)
  };
  const handleCloseFail = () => setOpenFail(false);
  const showSolutionModal = () => { setshowSolution(true); setAnswerShown(true) }





  const SimpleCodeViewer = () => {
    const { sandpack, dispatch, listen } = useSandpack();
    const { files, activePath, setActiveFile, openFile, resetAllFiles } = sandpack;
    const { refresh } = useSandpackNavigation();
    const { code, updateCode } = useActiveCode();


    useEffect(() => {
      const unsubscribe = listen((msg) => {
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/App.js')
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

    const codee = files[activePath].code;

    return (
      <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
      <div  style={{ height: '40px', width: "50%", textAlign: 'center' }}>
      <Popconfirm
              title={'?????????? ???????????????? ?????? ???????????? ???? ?????????????????????? ?????? ???????????? ???????? ???????????? ?????? ??????????????????? ?????? ?? ?????????????? ?????? ???? ??????????.'}
              onConfirm={resetAllFiles}
              okText={'??????'}
              cancelText={'??????'}

            >
        <Button variant="contained" color='primary' style={{ height: '40px', width: "100%", textAlign: 'center' }}  > ?????????????????? ????????????  </Button>;
        </Popconfirm>
        </div>
         <Button variant="contained" color='primary' style={{ height: '40px', width: "50%", textAlign: 'center' }} onClick={runTests} > ??????????????  </Button>;
      </div>
    </>
    );
  };

  const code = `import '@testing-library/jest-dom';
    `

  return (

    <div style={{ height: '60%' }}>
      <div style={{ height: '80%', marginBottom: '1%', marginTop: '2%', paddingTop: '2%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
        <Grid container overflow="auto" flex={1} display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>???????????????? </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> React js Router Links</Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                ???? ?????????????????????????? ???????? ???? ???????????????????? ???????????? ?????????????????? ?????? React js ???????????????? ?????? ?????????????? ??????
                ?????? <span style={{ fontWeight: 'bold' }}> Links </span> ???????? ???? ?????????????????????????? ?????? ?????????????? ?????? ?????? ???? React Router!
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                ?? ???????????? ?????? ???? ???????????????????????????????? ???? route  paths ?????? ???????????????? ?????? ?????????????????????? ???????????? ?????? ???? ????????????????????????????
                ?????? single page application  ?????????? ???????? ??????
                <span style={{ backgroundColor: '#f4f4f4' }}> {`<Links></Links>`}</span>. ??????<span style={{ backgroundColor: '#f4f4f4' }}> {`<Links></links>`}</span> tags
                ???????????????? ???? ???????????????????????????????? ?????? ???????????????? <span style={{ backgroundColor: '#f4f4f4' }}> to</span> ?????? ???? ?????????????????????? ???? ????????
                path ???? ???????????? ???? ?????????????????? ?????? ?????? ???????????? ???? ?????????????? ?????? ?????????? ??????????????????????
                ?????????????? ?????????????????????? ?????? tag ???????? ?????????? ???????????? ?????? ???? ?????????????????????? ???????? ??????????.
                ???? ?????????? ?????? ????????????????????.
              </Typography>

              <div>
                <CopyBlock
                  text={`<Link to="/about">About</Link> `}
                  language="html"
                  showLineNumbers={false}
                  theme={dracula}
                  codeBlock
                />
              </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                ?????? ????????????????????  ???????? ???? ?????????????? ?????????????? ?????? ????????????????, ???? ?????????????????? ???????? ???????????? ?????? ???????? ???????????????? ???? ???? url /about
              </Typography>

              <div style={{ marginTop: '4%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>?????????????? </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                ???????????? ?????????????????????????? ?????? ???????? ????????????????. ?????????? ?????? ?????????? ???????????????????? ?????? ???? ???????????????????? ?????? ?????????? ?????? ??????????????.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                ???? ???????? ???? ???????????? ???????????? ???? ???????????????????? ???? ?????????????????? <span style={{ fontWeight: 'bold' }}> Links </span> ???????? ???????? :
              </Typography>
              <ul>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    ????o  First.js ???? ?????????????????? link ?????? ???? ?????????????????? ???????? ???????????? ???????????? (path = '/') ?????? ???? ???????? ???? ?????????????? 'Go back'
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    ????o  Second.js ???? ?????????????????? link ?????? ???? ?????????????????? ???????? ???????????? ???????????? (path = '/') ?????? ???? ???????? ???? ?????????????? 'Go back'
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    ??To Third.js ???? ?????????????????? link ?????? ???? ?????????????????? ???????? ???????????? ???????????? (path = '/') ?????? ???? ???????? ???? ?????????????? 'Go back'
                  </Typography>
                </li>
              </ul>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                <span style={{ fontWeight: 'bold' }}> ????????????????: </span> ???????????? ???? ?????????????????????? ???? ????????????  First.js,  Second.js ?????? Third.js.
              </Typography>

            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", height: '75vh', width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   React Tutorial  7 / 7  </Typography>

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
                  "history": "5.0.1",
                  "react-dom": "latest",
                  "react-test-renderer": "latest",
                  "react-router-dom": "5.1.2",
                  "babel-runtime": "latest",
                  "@testing-library/jest-dom": "^5.14.1",
                  "@testing-library/react": "^11.2.7",
                  "@testing-library/user-event": "^12.8.3",
                },
                entry: '/intex.html'


              }}   >

                <SandpackThemeProvider  >
                  <SandpackLayout theme="codesandbox-dark">
                    <SandpackCodeEditor showTabs="true" customStyle={{ marginTop: '0.5vh', height: '59.5vh', width: '400px' }}    > </SandpackCodeEditor>
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
                      ???????????????????????? ???????????????????????? ???? tutorial ?????? React js. 
                      </Typography>
                      <Button style={{ marginTop: '10%' }} variant="contained" color="primary" onClick={handleCloseSuccess}>?????????????????? ???????? ????????????</Button>
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
                        H ???????????????? ?????? ???????????? ???????? ????????????????????
                      </Typography>
                      <Button style={{ marginTop: '10%' }} variant="contained" color="secondary" onClick={handleCloseFail}> ?????????????????????? ????????</Button>
                    </Box>
                  </Box>
                </Card>

              </Modal>



            </Card>
          </Grid>

          <Grid item xs={completed ? 6 : 8}></Grid>
          <Grid item xs={2} key="fot1">
            <Button variant="contained" onClick={goBack} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
              ????????
            </Button>
          </Grid>
          {completed && (
            <Grid item xs={2} key="fot2">
              <Button variant="contained" onClick={goNext} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
                ??????????
              </Button>
            </Grid>
          )}
          <Grid item xs={2} key="fot">
            <Popconfirm
              title={'?????????? ???????????????? ?????? ???????????? ???? ?????????? ?????? ????????????????'}
              onConfirm={showSolutionModal}
              okText={'??????'}
              cancelText={'??????'}

            >

              <Button variant="contained" style={{ backgroundColor: '#19E619', minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
                ????????
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
                        <Typography  style={{ width: '100%', marginTop: '2%', marginBottom: '5%' }} align="center" id="keep-mounted-modal-description" >
                          ???? ???????????? First.js, Second.js ?????? Third.js ???????????? ???? ?????????? ?????? ???????????????? ??????????:
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
      const bool = await validityCheck('r6', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email, 'r7')
        return {
          props: { completed },
        };
      } else {
        return {
          redirect: {
            destination: '/react/sixth',
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

