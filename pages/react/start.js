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
import localFile from "!!raw-loader!../../Components/AppFooter";
import testAppCode from "!!raw-loader!../../Components/ApprealTest";
import Appcode from "!!raw-loader!../../Components/Apptest";
import indexFile from "!!raw-loader!../../Components/indexFiles";
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
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);



    const SimpleCodeViewer = () => {
        const { sandpack,dispatch, listen } = useSandpack();
        const { files, activePath } = sandpack;
        const { refresh } = useSandpackNavigation();
        const { code, updateCode } = useActiveCode();

        
        const handleRefresh =  () => {
            // listens for any message dispatched between sandpack and the bundler
            const stopListening = listen((message) => console.log(message));
            // sends the refresh message to the bundler, should be logged by the listener
            (dispatch({ type: "urlback"}));
            
            // unsubscribe
             stopListening();
            console.log("here")
          };
        useEffect(() => {
            console.log(code);
            console.log(sandpack);
        }, [sandpack]);

        const codee = files[activePath].code;
       // console.log(codee);
       //onClick={()=>{ refresh() }}
        return (
        <div style={{ width: '100%' , height:'40px'}}>
            <Button  variant="contained"  color='primary' style={{ height:'40px', width:"100%", textAlign: 'center'}} onClick={handleRefresh} > Run Tests  </Button>;
        </div>
        );
    };

    const code = `
    import React from "react";
import { render } from "react-dom";

//importing the test runner
import Test from "./Test";

//importing some code I want to test
import QuickSort from "./QuickSort";
import BubbleSort from "./BubbleSort";

const App = () => (
  <div style={{ fontFamily: "sans-serif" }}>
    <h3>✅ Running unit tests with Jest Test Compnent...</h3>
    <div>
      Simple Equality Tests...
      <Test input={1} output={1} name="numbers" />
      <Test input={"alice"} output={"alice"} name="strings" />
      <Test input={[1, 2]} output={[1, 2]} name="arrays" />
      <Test
        input={{ name: "alice", loc: "paris" }}
        output={{ name: "alice", loc: "paris" }}
        name="objects"
      />
    </div>
    <br />
    <div>
      Testing Bubble Sort...
      <Test input={BubbleSort([1])} output={[1]} name="empty array test" />
      <Test
        input={BubbleSort([1])}
        output={[1]}
        name="single element array test"
      />
      <Test
        input={BubbleSort([2, 1])}
        output={[1, 2]}
        name="two elements array test"
      />
      <Test
        input={BubbleSort([10, 5, 6, 2, 1])}
        output={[1, 2, 5, 6, 10]}
        name="many elements array test"
      />
    </div>
    <br />
    <div>
      Testing Quick Sort...
      <Test input={QuickSort([])} output={[]} name="empty array test" />
      <Test
        input={QuickSort([1])}
        output={[1]}
        name="single element array test"
      />
      <Test
        input={QuickSort([2, 1])}
        output={[1, 2]}
        name="two elements array test"
      />
      <Test
        input={QuickSort([10, 5, 6, 2, 1])}
        output={[1, 2, 5, 6, 10]}
        name="many elements array test"
      />
    </div>
  </div>
);

render(<App />, document.getElementById("root"));

    `;

    const testCode = `
    import React from "react";
import expect from "jest-matchers";

export default ({ input, output, name }) => {
  let status = "✅";
  try {
    expect(input).toEqual(output);
  } catch (AssertionError) {
    console.log(AssertionError);
    status = "❌";
  }
  return (
    <div>
      {status} {name}
    </div>
  );
};

    `;

    const quicksortCode = `
    export default array => {
        return quickSortRecursive(array, 0, array.length - 1);
      };
      
      const quickSortRecursive = (array, left, right) => {
        let index;
        if (array.length > 1) {
          index = partition(array, left, right);
          if (left < index - 1) {
            quickSortRecursive(array, left, index - 1);
          }
          if (index < right) {
            quickSortRecursive(array, index, right);
          }
        }
        return array;
      };
      
      const partition = (array, left, right) => {
        let mid = Math.floor((left + right) / 2);
        let pivot = array[mid];
        let il = left;
        let ir = right;
        while (il <= ir) {
          //while the boundaries dont collide
          while (array[il] < pivot) {
            //while values on left are less than pivot, keep going
            il++;
          }
          while (array[ir] > pivot) {
            //while value on right are great than pivot, keep going
            ir--;
          }
          if (il <= ir) {
            //swap the values that are incorrectly placed
            [array[il], array[ir]] = [array[ir], array[il]];
            il++;
            ir--;
          }
        }
        return il; //return the correct position of the pivot in the array
      };
      
    `;
    const bubblesortCode = `
    export default array => {
        let length = array.length;
        for (let i = 0; i < length; i++) {
          let swapped = false;
          for (let j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
              [array[j], array[j + 1]] = [array[j + 1], array[j]];
              swapped = true;
            }
          }
          if (!swapped) {
            break;
          }
        }
        return array;
      };
      
    `;

    return (

        <div style={{ height: '60%' }}>
            <Container maxWidth="l" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '1%', marginTop: '5%', paddingTop: '3%', paddingBottom: '3%' }}>
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
                    <Grid item xs={12}  key="fot">
                        <Card style={{ padding: "1%", width: '100%'}}>
                            <Typography variant="overline" style={{ display: 'flex',justifyContent:'center', textAlign: 'center'}}>   React Tutorial  </Typography>
                            
                            <SandpackProvider template="react" customSetup={{
                                files: {
                                   // "/index.js": code,
                                    //"/Test.js":testCode,
                                    //"/QuickSort.js": quicksortCode,
                                    //"/BubbleSort.js": bubblesortCode,
                                    //"/index.html": `<div id="root"></div>`
                                    "/App.js": Appcode,
                                    "/App.test.js":testAppCode,
                                    "index.js":indexFile
                                },
                                 dependencies: {
                                        "react-markdown": "latest",
                                        "jest-matchers" : "latest",
                                        "react-dom": "latest",
                                        "react-test-renderer": "latest",
                                        "react-router-dom": "latest",
                                        "babel-runtime": "latest"
                                    },
                                    entry:'/intex.html'


                            }}   >
                                
                                <SandpackThemeProvider  >
                                    <SandpackLayout theme="codesandbox-dark">
                                    <SimpleCodeViewer />
                                        <SandpackCodeEditor showTabs="true" customStyle={{ marginTop: '10px', height: '500px', width: '400px' }}    > </SandpackCodeEditor>
                                        <SandpackPreview viewportSize={{ width: 500, height: 500 }} />
                                    </SandpackLayout>
                                </SandpackThemeProvider>
                            </SandpackProvider>
                            
 {/*
                            <Sandpack
                                template="react"
                                files={{
                                    "/index.js": code,
                                    "/Test.js":testCode,
                                    "/QuickSort.js": quicksortCode,
                                    "/BubbleSort.js": bubblesortCode,
                                    "/index.html": `<div id="root"></div>`
                                }}
                                options={{
                                    editorHeight: 600,
                                  }}
                                customSetup={{
                                    dependencies: {
                                        "react-markdown": "latest",
                                        "jest-matchers" : "latest",
                                        "react-dom": "latest",
                                        "react-test-renderer": "latest",
                                        "babel-runtime": "latest"
                                    },
                                }}
                            />
                             */}
                            

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

