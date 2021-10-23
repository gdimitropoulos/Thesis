 /* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Image from 'next/image';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import { Box} from '@material-ui/core'



export default function AppHeader() {
  const router = useRouter();
	const [user, setUser] = useState(null);


  const logout = async () => {
    Cookies.remove('token');
    localStorage.clear();
    setUser(null);
    //TODO FIX FOR FB LOGOUT 
    //window.FB.logout();
    await router.push('/');
  };

  useEffect(async () => {
    let token = Cookies.get('token');
    if (!token) {
      setUser(null);
      localStorage.clear();
    }
    else {
    
      setUser(localStorage.getItem('user'));
    }
  });

  return (
    <div >
      <AppBar position="static" style={{ backgroundColor: '#194b8c', height: 95 }}>
        <Toolbar style={{ alignItems: 'center', height: 95,display: 'flex' ,justifyContent: 'space-between' }}>
      <div style={{  display: 'flex', justifyContent:'center'}}>
          <Box
            style={{ borderRight: '0.1em solid white', padding: '0.5em' }}
          >
            <Image width={170} height={60} src="/up_2017_logo_en.jpg" alt="logo"  style={{ height: 50, paddingRight: 5, paddingLeft: 5 }} />
          </Box>
            <Button
              component={Link}
              href="/"
              style={{ textTransform: 'none', textDecoration: 'none', color: 'white' }}
              color="inherit"
            >
              <h4  style={{ textTransform: 'none', textDecoration: 'none', color: 'white' }}>{'Web Frameworks Tutorials'}</h4>
            </Button>
            </div>
          { user &&  (<Button variant="contained" style={{ left: 0, pointerEvent:'auto', cursor: 'pointer', float: 'right'}} onClick={logout}> LogOut</Button>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}
