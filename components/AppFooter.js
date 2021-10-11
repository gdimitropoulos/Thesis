import React from 'react';
import Image from 'next/image';
// import Image from 'material-ui-image'
import {
  Grid, Box, Typography, Link,
} from '@material-ui/core';



export default function AppFooter() {
  return (
    <footer>
      <Box style={{
        backgroundColor: '#194b8c',
        bottom: 0,
        maxWidth: '100%',
        marginTop: 'calc(2% + 60px)',
        padding: '30px',
      }} position="sticky">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '8vh' }}
        >
          <Grid item xs={12}>
            <Image src="/University_of_Patras_(seal).png" width={110} height={80} alt="Picture of the university logo" />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: 'white' }}>Πανεπιστήμιο Πατρών 2021</Typography>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>

      </Box>
    </footer>
  );
}
