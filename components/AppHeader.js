import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Image from 'next/image';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 160,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#194b8c',
  },
}));

export default function AppHeader() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" style={{ height: 95}}>
        <Toolbar style={{alignItems: 'center',height: 95}}>
          <Typography
            type="title"
            color="inherit"
            style={{ borderRight: '0.1em solid white', padding: '0.5em' }}
          >
            <Image width={170} height={60} src="/up_2017_logo_en.jpg" alt="logo" className={classes.logo} style={{ height: 50,paddingRight: 5,paddingLeft: 5}} />
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Button
              component={Link}
              href="/"
              style={{ textTransform: 'none', textDecoration: 'none' , color:'white'}}
              color="inherit"
            >
              <h4>{'Web frameworks Tutorials'}</h4>
            </Button>
          </Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}
