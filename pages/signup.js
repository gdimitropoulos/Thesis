import React, {
  useState, 
} from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  TextField,
  Container,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import showNotification from '../Lib/notification'
import { getAppCookies } from '../Lib/utils'

export default function SignUp() {
	const router = useRouter();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [name, setName] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [confirmPass, setConfirmPass] = useState([]);
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const signIn = async () => {
    try {
      console.log(process.env.DB_USER);
      console.log(email, password)
      if (email && password && lastname && name && confirmPass) {
        if (validateEmail(email)) {
          if (password === confirmPass) {
            const bodyData = {
              email: email,
              password: password,
              name: name,
              lastname: lastname
            }
            console.log(bodyData);
            const res = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(bodyData),
            });

            const data = await res.json();

            if (res.status === 200) {
              showNotification(
                'success',
                'Επιτυχημένη εγγραφή ',
                'Καλώς ήρθατε. Μπορείτε πλέον να συνδεθείτε στο σύστημα.'
              );
              await router.push('/');
            }
            else {
              showNotification(
                'error',
                'Σφάλμα πρόσβασης',
                'Μη αποδεκτά συνθηματικά. Παρακαλούμε επαναλάβετε.'
              );
            }
          } else {
            showNotification(
              'error',
              'Σφάλμα πρόσβασης',
              'Οι κωδικοί που βάλατε δεν ταιριάζουν'
            );

          }
        } else {
          showNotification(
            'error',
            'Σφάλμα ',
            'Παρακαλόυμε εισάγετε σωστό email'
          );

        }
      } else {
        showNotification(
          'error',
          'Σφάλμα ',
          'Παρακαλούμε συμπληρώστε όλα τα πεδία'
        );
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
  };
  const handlePass = (event) => {
    setPassword(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastname(event.target.value);
  };
  const handleConfirmPass = (event) => {
    setConfirmPass(event.target.value);
  };



  return (
    <Container style={{ display: 'flex', justifyContent: 'center', height: '80%', marginBottom: '5%', marginTop: '3%', padding: '4%' }}>
      <Card style={{ minWidth: 500 }}>
        <div style={{ padding: '5%' }}>
          <Typography variant="h5" color="text.secondary" style={{ marginBottom: '5%', textAlign: 'center' }} >
            Εγγραφείτε στο σύστημα .
          </Typography>
          <Box style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '5%' }}>
            <TextField onChange={handleName} size="small" label="Name" variant="outlined"  />
          </Box>
          <Box style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '5%' }}>
            <TextField onChange={handleLastName} size="small" label="Lastname" variant="outlined"  />
          </Box>
          <Box style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '5%' }}>
            <TextField onChange={handleEmail} size="small" label="email" variant="outlined" type="email" />
          </Box>
          <Box style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '5%' }}>
            <TextField onChange={handlePass} size="small" label="password" variant="outlined" type="password" />
          </Box>
          <Box style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '5%' }}>
            <TextField onChange={handleConfirmPass} size="small" label="Confirm password" variant="outlined" type="password" />
          </Box>


          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '5%' }}>
            <Button type="submit" variant="contained" color="secondary" onClick={signIn}>
              Εγγραφη
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            &nbsp; ή &nbsp;
            <Link href="/">
              <a href="">Σύνδεση</a>
            </Link>
          </div>

        </div>
      </Card>
    </Container>
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

      /*return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };*/
      return {
        props: {},
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

