import React from 'react';
import Image from 'next/image';
// import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Box, Typography, Link,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#194b8c',
    bottom: 0,
    maxWidth: '100%',
    marginTop: 'calc(2% + 60px)',
    padding: '30px',
  },
}));

export default function AppFooter() {
  const classes = useStyles();
  return (
    <footer>
      <Box className={classes.root} position="sticky">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '8vh' }}
        >
          <Grid item xs={12}>
            <Image src="/University_of_Patras_(seal).png" width={110} height={80} />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: 'white' }}>Πανεπηστιμιο Πατρών 2021</Typography>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
       
      </Box>
    </footer>
  );
}
