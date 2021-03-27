import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Button,
  Card,
  Paper,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(0)
  },
  paper: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
  },
  heroContent: {
    padding: theme.spacing(2, 0, 2),
    margin: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Paper maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" align="center" variant="h1" color="textPrimary">
          What do we do?
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Project Description
        </Typography>
      </Paper>
      <div>
        <Typography component="h1" align="center" variant="h2" color="textPrimary">
          How it works?
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Project Description
        </Typography>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Step1: Bias Preference
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Select on checkbox or upload csv file
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Step2: Upload
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Uploading CV
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Step3: Bias Replacement
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Showing the detected bias words and user can replce them
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Step4: Download
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Download the edited CV
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Simple mode
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    All settings are default, you start here to build first project
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant="contained" color="primary" component={Link} to="/app/selectPreference">
                  GET STARTED
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Advanced Mode
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    User can select personal model to generate your CV
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant="contained" color="primary" component={Link} to="/app/selectModel">
                  GET STARTED
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;
