import React from 'react';
import { useNavigate } from 'react-router-dom';
import Preference from 'src/components/Preference';
import {
  Container,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  CardActions,
  Paper,
  Grid,
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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  heroContent: {
    padding: theme.spacing(2, 0, 2),
    margin: theme.spacing(4),
  },
  cardContent: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

const SelectModel = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [model, setModel] = React.useState('model1');
  const [modelURL, setModelURL] = React.useState('https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz')

  const handleChangeURL = (event) => {
    setModelURL(event.target.value)
  };

  const handleChange = (event) => {
    setModel(event.target.value);
  };

  return (
    <Page
      className={classes.root}
      title="SelectModel"
    >
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    word2vec-google-news-300
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2" align="left">
                    file size: 376 MB
                  </Typography>
                  <CardActions>
                    <Button size="small" color="primary" href="https://code.google.com/archive/p/word2vec/">
                      click to learn
                    </Button>
                  </CardActions>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    fasttext-wiki-news-subwords-300
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2" align="left">
                    file size: 376 MB
                  </Typography>
                  <CardActions>
                    <Button size="small" color="primary" href="https://fasttext.cc/docs/en/english-vectors.html">
                      click to learn
                    </Button>
                  </CardActions>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    glove-wiki-gigaword-300
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2" align="left">
                    file size: 376 MB
                  </Typography>
                  <CardActions>
                    <Button size="small" color="primary" href="https://nlp.stanford.edu/projects/glove/">
                      click to learn
                    </Button>
                  </CardActions>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    glove-twitter-200
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h2" align="left" color="grey">
                    file size: 376 MB
                  </Typography>
                  <CardActions>
                    <Button size="small" color="primary" href="https://nlp.stanford.edu/projects/glove/">
                      click to learn
                    </Button>
                  </CardActions>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Paper maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Model Selection
        </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={6} justify="center">
            <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">Model</FormLabel>
                <RadioGroup aria-label="model" name="model" value={model} onChange={handleChange}>
                  <FormControlLabel value="model1" control={<Radio />} label="word2vec-google-news-300" />
                  <FormControlLabel value="model2" control={<Radio />} label="fasttext-wiki-news-subwords-300" />
                  <FormControlLabel value="model3" control={<Radio />} label="glove-wiki-gigaword-300" />
                  <FormControlLabel value="model4" control={<Radio />} label="glove-twitter-200" />
                  <TextField label="If you want other Model, type URL" variant="outlined" onChange={handleChange}/>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Preference model={model} navigate={navigate}/>
    </Page>
  );
};

export default SelectModel;
