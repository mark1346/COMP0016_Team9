import React from 'react';
import {
  Container,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import DisplayBox from './DisplayBox';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const GenerateView = () => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Generate"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <DisplayBox file_decoded={location.state.file_decoded}/>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Results bias_response={location.state.bias_response} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default GenerateView;
