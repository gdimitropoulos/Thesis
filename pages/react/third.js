/*eslint-disable react/no-unescaped-entities */
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
import testAppCode from "!!raw-loader!../../components/reactTutorial/FourthReactTutorial/tutorialAppTest";
import testAppCode1 from "!!raw-loader!../../components/reactTutorial/FourthReactTutorial/tutorialAppTest1";
import Appcode from "!!raw-loader!../../components/reactTutorial/FourthReactTutorial/tutorialApp";
import indexFile from "!!raw-loader!../../components/reactTutorial/FourthReactTutorial/tutorialIndex";
import componentCode from "!!raw-loader!../../components/reactTutorial/FourthReactTutorial/tutorialComponent";
import appcss from "!!raw-loader!../../components/reactTutorial/FourthReactTutorial/App.css";
import solutionCode from "!!raw-loader!../../components/reactTutorial/FourthReactTutorial/solution";
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
    router.push('/react/second')
  }
  const goNext = () => {
    router.push('/react/fourth')
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
    console.log(moment().diff(time, 'seconds'));
    const bodyData = {
      time,
      backspaces: backspaces,
      lessonName: 'r3',
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
        'Επιτυχής καταγραφή ',
        'Επιτυχής καταγραφή της προσπάθειας'
      );
      await router.push('/react/fourth')
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
    const { files, activePath, setActiveFile, openFile, resetAllFiles } = sandpack;
    const { refresh } = useSandpackNavigation();
    const { code, updateCode } = useActiveCode();



    useEffect(() => {
      window.addEventListener('paste', pasteHandler)
      window.addEventListener('keydown', eventHandler);
      return () => {
        window.removeEventListener('paste', pasteHandler)
        window.removeEventListener('keydown', eventHandler);
        return null
      }

    }, []);

    useEffect(() => {
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
    }, [listen, dispatch, setActiveFile]);

    const runTests = () => {
      writeFlag = 0
      backspacesPerTry.push(backspaces);
      totaltCharsPerTry.push(totalCharsWritten);
      totalTries++;
      timeFinishingTest.push(moment());
      dispatch({ type: 'run-all-tests' });
    };

    const codee = files[activePath].code;

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
      <div style={{ height: '80%', marginBottom: '1%', marginTop: '2%', paddingTop: '2%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
        <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
          <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
            <Card style={{ maxHeight: "75vh", overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
              <div style={{ marginBottom: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
              <Typography variant="h6" style={{ marginBottom: '2%', width: '100%', marginBottom: '1%' }}> Lifecycle Methods and Class Component </Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                Σε αυτό το μάθημα  θα πρέπει να κάνετε χρήση βασικών Lifecycle μεθόδων σε ένα  <span style={{ fontWeight: 'bold' }}> class component </span>!
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Έχουμε αρχικοποιήσει για εσάς το Home.js  το οποίο είναι το component που θα πρέπει να χρησιμοποιήσετε.
              </Typography>

              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Κάθε component έχει μερικές lifecycle μεθόδους που μπορούμε να χρησιμοποιούμε για να τρέχουμε κώδικα σε συγκεκριμένες στιγμές της
                "ζωής" του component. Μπορείτε να χρησιμοποιήσετε <a
                  className="App-link"
                  href="https://reactjs.org/docs/components-and-props.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  αυτό
                </a> το διάγραμμα ως βοήθημα για να καταλάβετε πως λειτουργούν οι lifecycle μέθοδοι καθώς και την πορεία της ζωής ενός
                component. Aς δούμε μερικά από τα βασικότερα χαρακτηριστικά των component της React!
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Η πρώτη lifecycle μέθοδος που θα δούμε είναι ο <span style={{ fontWeight: 'bold' }}> constructor()</span> o οποίος λειτουργεί όπως σε όλες 
                τις αντικειμενοστρεφείς γλώσσες προγραμματισμού :
                <CopyBlock
                  text=
                  {` 
 constructor(props) {
      super(props);
      
                  }
             `}
                  language="actionscript"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
                Είναι σημαντικό να καλούμε πάντα το super (props) για να σιγουρευτούμε ότι τα props δεν θα είναι undefined.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Ένα από τα πιο σημαντικά κομμάτια της React είναι το <span style={{ fontWeight: 'bold' }}> state</span>. To state είναι ο τρόπος
                που κρατάμε πληροφορίες για την τωρινή κατάσταση του component και γίνεται updated κάθε φορά που υπάρχει κάποια αλλαγή σε αυτό.
                Η αρχικοποίησή της γίνεται με τον εξής τρόπο:
              </Typography>
              <CopyBlock
                text=
                {` 
 constructor(props) {
      super(props);
      this.state={counter: 0}
      
                  }
             `}
                language="actionscript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Πρέπει να σημειώσουμε ότι το state πρέπει να είναι πάντα αντικείμενο και δεν μπορούμε να κάνουμε απευθείας ανάθεση σε αυτό
                σε σημείο εκτός απο τον constructor/αρχικοποιητή του. Αν κάποια στιγμή θέλουμε να αλλάξουμε πρέπει να χρησιμοποιήσουμε το api setState().
              </Typography>

              <CopyBlock
                text=
                {`this.setState({counter: value})`}
                language="actionscript"
                showLineNumbers={true}
                theme={dracula}
                codeBlock
              />
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Στο παραπάνω παράδειγμα η συνάρητηση setState θέτει τον counter του state σε μια τιμή value!
              </Typography>

              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                H επόμενη και ίσως πιο συχνά χρησιμοποιούμενη lifecycle μέθοδος που θα δούμε είναι το
                <span style={{ fontWeight: 'bold' }}> ComponentDidMount()</span> που εκτελείται όταν το
                component έχει αρχικοποιηθεί και έχει γίνει rendered στην οθόνη.
                <CopyBlock
                  text=
                  {`  componentDidMount() {
    this.setState({ counter : 1})
  }`} language="actionscript"
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
                />
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Στον παραπάνω κώδικα καλείται  η setState() όταν αρχικοποιηθεί το component μας και θέτει την τιμή του counter σε ένα.
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>
                Επειδή στα πλαίσια του μαθημάτος δεν προλαβαίνουμε να καλύψουμε τα περισσότερα κομμάτια της React που αφορούν τα class components και
                τις lifecycle μεθόδους αν θέλετε περισσότερες πληροφορίες μπορείτε να τις βρείτε <a
                  className="App-link"
                  href="https://reactjs.org/docs/state-and-lifecycle.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  εδώ
                </a>.
              </Typography>



              <div style={{ marginTop: '2%', height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
              <Typography variant="subtitle1" style={{ marginBottom: '2%', textAlign: 'justify', width: '100%' }}>

                Όπως αναφέραμε προηγουμένως έχουμε αρχικοποιήσει για έσας ένα απλό πρότζεκτ που περιέχει το component Home και την βασική δομή ενός React πρότζεκτ.
                Πάρτε όσο χρόνο χρειάζεστε για να μελετήσετε τα αρχεία ώστε να καταλάβετε τι περιέχεται στο καθένα!
              </Typography>

              <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                Τροποποιήστε το αρχείο Home.js στην γραμμή 12, έτσι ώστε να θέσετε το message
                του state σε <span style={{ fontStyle: 'italic' }}> Νέα Πανεπιστημίου Πατρών </span>.

              </Typography>

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
                  "/App.js": Appcode,
                  "/App.test.js": {
                    code: testAppCode,
                    hidden: true
                  },
                  "/second.test.js": {
                    code: testAppCode1,
                    hidden: true
                  },
                  "/public/App.css": { code: appcss, hidden: true },
                  "index.js": indexFile,
                  "SetupTest.js": {
                    code: code,
                    hidden: true
                  },
                  "/Home.js": { code: componentCode, active: true }
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
                    <SandpackCodeEditor showLineNumbers="true" showTabs="true" customStyle={{ marginTop: '0.5vh', height: '59.5vh', width: '400px' }}    > </SandpackCodeEditor>
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
                επομενο
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
                      <Typography style={{ marginTop: '2%', marginBottom: '5%' }} align="center" id="keep-mounted-modal-description" >
                        Τό αρχείο Home.js πρέπει να έχει την εξής μορφή :
                      </Typography>
                    </div>
                    <div style={{ width: '100%' }}>
                      <SyntaxHighlighter code={solutionCode} language="javascript" showLineNumbers={true} />
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
      const bool = await validityCheck('r2', token.email);
      if (bool) {
        const completed = await checkLessonTaken(token.email,'r3')
        return {
          props: {
            completed
          },
        };
      } else {
        return {
          redirect: {
            destination: '/react/second',
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

