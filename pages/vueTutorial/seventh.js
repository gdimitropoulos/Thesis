/* eslint-disable  react/no-unescaped-entities*/

import React, {
  useState, useEffect,
} from 'react';
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CopyBlock, dracula } from "react-code-blocks";
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
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import appvue from "!!raw-loader!../../components/VueTutorial/seventhTutorial/appvue";
import mainjs from "!!raw-loader!../../components/VueTutorial/seventhTutorial/main";
import helloworld from "!!raw-loader!../../components/VueTutorial/seventhTutorial/news";
import testing from "!!raw-loader!../../components/VueTutorial/seventhTutorial/testing";
import homejs from "!!raw-loader!../../components/VueTutorial/seventhTutorial/home";
import routerjs from "!!raw-loader!../../components/VueTutorial/seventhTutorial/router";
import first from "!!raw-loader!../../components/VueTutorial/seventhTutorial/first";
import second from "!!raw-loader!../../components/VueTutorial/seventhTutorial/second";
import third from "!!raw-loader!../../components/VueTutorial/seventhTutorial/third";
import solutionCode from "!!raw-loader!../../components/VueTutorial/seventhTutorial/solution";
import solutionCode1 from "!!raw-loader!../../components/VueTutorial/seventhTutorial/solution1";
import solutionCode2 from "!!raw-loader!../../components/VueTutorial/seventhTutorial/solution2";
import solutionCode3 from "!!raw-loader!../../components/VueTutorial/seventhTutorial/solution3";
import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { validityCheck, checkLessonTaken } from '../../Lib/dao';
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

export default function Start({ completed }) {
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
    router.push('/vueTutorial/sixth')
  }
  const goNext = () => {
    router.push('/user/dashboard')
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

  const handlecloseSolution = async () => {
    setshowSolution(false)
  }
  const handleCloseSuccess = async () => {
    const bodyData = {
      time,
      backspaces: backspaces,
      lessonName: 'v7',
      tutorailName: 'vue',
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
  };
  const handleCloseFail = () => setOpenFail(false);
  const showSolutionModal = () => { setshowSolution(true); setAnswerShown(true) }
  const correctAnswer = `  import React from "react";
  
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
    const { files, activePath, setActiveFile, openFile, resetAllFiles } = sandpack;



    useEffect(() => {
      const unsubscribe = listen((msg) => {
        if (msg.event == 'test_end') {
          if (msg.test.status == 'fail') {
            dispatch({ type: 'refresh' });
            setActiveFile('/src/App.vue')
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
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '1%', marginTop: '5%', paddingTop: '3%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
        <Grid container overflow="auto" flex={1}  display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>???????????????? </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Vue js Router-links</Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                ???? ?????????????????????????? ???????? ???? ???????????????????? ???????????? ?????????????????? ?????? Vue js ???????????????? ?????? ?????????????? ??????
                ?????? <span style={{ fontWeight: 'bold' }}> router-links </span> ???????? ???? ?????????????????????????? ?????? ?????????????? ?????? ?????? ???? Vue Router!
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                ?? ???????????? ?????? ???? ???????????????????????????????? ???? route  paths ?????? ???????????????? ?????? ?????????????????????? ???????????? ?????????? ???????? ??????
                <span style={{ backgroundColor: '#f4f4f4' }}> {`<router-links></router-links>`}</span>. ??????
                <span style={{ backgroundColor: '#f4f4f4' }}> {`<router-links></router-links>`}</span> tags ???????????????? ???? ???????????????????????????????? ?????? ????????????????
                <span style={{ backgroundColor: '#f4f4f4' }}> :to </span> ?????? ???? ?????????????????????? ???? ???????? path ???? ???????????? ???? ??????????????????. ???? ?????????? ?????? ????????????????????.
              </Typography>
              <div>
                <CopyBlock
                  text={`<router-link to="/about">About</router-link> `}
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
                ???? ???????? ???? ???????????? ???????????? ???? ???????????????????? ???? ?????????????????? <span style={{ fontWeight: 'bold' }}> router-links </span> ???????? ???????? :
              </Typography>
              <ul>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    ?????? News.vue ???? ???????????? ???? ???????????????????? ???? links ???????? ????????
                    ???????? ?????? ???????????? ?????????????? ?????? ???????????????? ???? ?????????????????????? ?????? target property ?????? ???????????????? ?? ?????????????? articles.
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    ????o  First.vue ???? ?????????????????? link ?????? ???? ?????????????????? ???????? ???????????? ???????????? (path = '/')
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    ????o  Second.vue ???? ?????????????????? link ?????? ???? ?????????????????? ???????? ???????????? ???????????? (path = '/')
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                    ??To Third.vue ???? ?????????????????? link ?????? ???? ?????????????????? ???????? ???????????? ???????????? (path = '/')
                  </Typography>
                </li>
              </ul>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                <span style={{ fontWeight: 'bold' }}> ????????????????: </span> ???????????? ???? ?????????????????????? ???? ???????????? News.vue, First.vue,  Second.vue ?????? Third.vue.
              </Typography>


            </Card>
          </Grid>

          <Grid item md={12} lg={8}>
            <Card style={{ padding: "1%", height: '75vh', width: '100%' }}>
              <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js Tutorial  7 / 7  </Typography>

              <SandpackProvider template="vue" customSetup={{
                files: {
                  "/src/App.vue": appvue,
                  "/src/main.js": {
                    code: mainjs,
                  },
                  "/tests/unit/app.spec.js": { code: testing, hidden: true },
                  "/src/components/News.vue": { code: helloworld, hidden: false },
                  "/src/views/Home.vue": { code: homejs, hidden: false },
                  "/src/views/First.vue": { code: first, hidden: false },
                  "/src/views/Second.vue": { code: second, hidden: false },
                  "/src/views/Third.vue": { code: third, hidden: false },
                  "/src/router/index.js": { code: routerjs, hidden: true },
                },
                dependencies: {
                  "babel-runtime": "latest",
                  "@vue/test-utils": "^2.0.0-rc.15",
                  "vue-jest": "latest",
                  "vue": "^3.2.19",
                  "vue-template-compiler": "latest",
                  "vue-loader": "latest",
                  "vue-router": "^4.0.11"

                },
              }} >
                <SandpackThemeProvider  >
                  <SandpackLayout theme="codesandbox-dark">
                    <SandpackCodeEditor showTabs="true" customStyle={{ marginTop: '0.5vh', height: '59.5vh', }}    > </SandpackCodeEditor>
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
                      <Typography style={{ marginTop: '2%' }} align="center" variant="h5" id="keep-mounted-modal-description" >
                        ???????????????????????? ???????????????????????? ???? tutorial ?????? Vue js. 
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
                    <Typography style={{ marginTop: '2%' }} align="center" variant="h5" id="keep-mounted-modal-description" >
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
                          ???? ???????????? News.vue, First.vue, Second.vue ?????? Third.vue ???????????? ???? ?????????? ?????? ???????????????? ??????????:
                        </Typography>
                      </div>

                      <div>
                        <Box sx={{ width: '100%', marginTop: '4%' }}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example" indicatorColor="primary"
                              textColor="primary">
                              <Tab label="News.vue" {...a11yProps(0)} />
                              <Tab label="First.vue" {...a11yProps(1)} />
                              <Tab label="Second.vue" {...a11yProps(2)} />
                              <Tab label="Third.vue" {...a11yProps(3)} />
                            </Tabs>
                          </Box>
                          <TabPanel value={value} index={0}>
                            <SyntaxHighlighter code={solutionCode} language="actionscript" showLineNumbers={true} />
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            <SyntaxHighlighter code={solutionCode1} language="actionscript" showLineNumbers={true} />
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            <SyntaxHighlighter code={solutionCode2} language="actionscript" showLineNumbers={true} />
                          </TabPanel>
                          <TabPanel value={value} index={3}>
                            <SyntaxHighlighter code={solutionCode3} language="actionscript" showLineNumbers={true} />
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

      const bool = await validityCheck('v6', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email, 'v7')
        return {
          props: {
            completed
          },
        };
      } else {
        return {
          redirect: {
            destination: '/vueTutorial/sixth',
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

