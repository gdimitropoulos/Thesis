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

import localFile from "!!raw-loader!../Components/AppFooter";
import Cookies from 'js-cookie';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackThemeProvider,
  SandpackPreview,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import styles from '../styles/Home.module.css'
import  showNotification from '../Lib/notification'
import { getAppCookies} from '../Lib/utils'

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const signIn =  async () =>{
    try {
      console.log( process.env.DB_USER);

      console.log(email,password)
			if (email && password) {
        const bodyData ={
          email: 'up1057605@upnet.gr',
          password: '123123'
        }
				const res = await fetch('/api/auth/signin', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(bodyData),
				});

				const data = await res.json();

				if (res.status === 200 && data.success && data.token) {
          console.log('here');
					Cookies.set('token', data.token);
					localStorage.setItem('user', email);
          showNotification(
            'success',
            'Επιτυχής σύνδεση',
            'Επιτυχής σύνδεση. Καλώς ήθρατε στο σύστημα.'
          );
					await router.push('user/dashboard');
         
				}
				else {
					showNotification(
						'error',
						'Σφάλμα πρόσβασης',
						'Μη αποδεκτά συνθηματικά. Παρακαλούμε επαναλάβετε.'
					);
				}
			}
		}
		catch (e) {
			console.error(e);
			showNotification(
				'error',
				'Σφάλμα πρόσβασης',
				'Σφάλμα συστήματος. Επικοινωνείστε με τον διαχειριστή'
			);
		}
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(validateEmail(email));
    console.log(email)
  };
  const handlePass = (event) => {
    setPassword(event.target.value);
    console.log(password)
  };

  const SimpleCodeViewer = () => {
    const { sandpack } = useSandpack();
    const { files, activePath } = sandpack;
    
    useEffect(() => {

      console.log(sandpack);
    }, [sandpack]);

    const code = files[activePath].code;
    console.log(code);
    return <div />;
  };

  const code = `export default function App() {
  return <h1>Hello Worldddddddd</h1>

  }`;

  return (
    <> 
    <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', height: '55vh', marginBottom: '2%', marginTop: '2%', padding: '3%' }}>
      <Card style={{ maxWidth: 500 }}>
        <div style={{ padding: '5%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>

            <Typography variant="body2"  style={{ marginBottom: '5%' }} >
            Συνδεθείτε στο σύστημα εισάγοντας το email και το password σας.
            </Typography>
          </div>
          <Box style={{  display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '5%'}}>
            <TextField  size="small" label="email" variant="outlined" type="email" onChange={handleEmail}  />
          </Box>
          <Box style={{  display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '5%'}}>
            <TextField size="small" label="password" variant="outlined" type="password" onChange={handlePass}   />
          </Box>

          <div style={{ display: 'flex', justifyContent: 'center', width: '100%',marginBottom: '5%' }}>
            <Button variant="contained" color="primary" onClick={signIn}>
              Σύνδεση
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          &nbsp; ή &nbsp;
						<Link href="signup">
							<a href="">Εγγραφή</a>
						</Link>
          </div>
         
        </div>
      </Card>
      {/*<SandpackProvider template="react" customSetup={{
        files: {
            "/App.js": localFile,
        },
        options{{
          editorHeight: 350,
        }}
        
    }} >
    <SandpackThemeProvider  > 
     <SandpackLayout theme="codesandbox-dark">
      <SandpackCodeEditor  showTabs="true"  viewportSize={{ width: 600, height: 600 }} > </SandpackCodeEditor>
      <SandpackPreview viewportSize={{ width: 600, height: 600 }}/>
      <SimpleCodeViewer/>
    </SandpackLayout>
    </SandpackThemeProvider>
  </SandpackProvider>*/}
      {/*<Sandpack  onClick={(event)=>{
      console.log(event);
    }} template="react" > </Sandpack>

  */}
    </Container>
    </>
  )
}


export async function getServerSideProps(context) {
  const KEY = process.env.JWT_KEY;
  //console.log(process.env.JWT_KEY);
  console.log('im here')
	try {
		let cookies = getAppCookies(context.req);
		let token = cookies.token;

		if (token) {
			token = token.replace('Bearer ', '');
			token = jwt.verify(token, KEY);

				return {
					redirect: {
						destination: '/user/dashboard',
						permanent: false,
					},
				};
       
			
		}
		else {
			return {
				props: {},
			};
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

