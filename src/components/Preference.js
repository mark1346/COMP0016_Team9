import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Radio,
  Paper,
  Grid,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Container
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  input: {
    display: 'none'
  }
}));

const Preference = ({model, navigate}) => {
  const classes = useStyles();
  const [preferenceValue, setPreferenceValue] = React.useState('gender');
  const [fileObj, setFileObj] = React.useState('');

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  // Programatically click the hidden file input element
  // when the Button component is clicked

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    toBase64(fileUploaded).then(
      (encodedData) => setFileObj(encodedData)
    );
  };

  const handleChangePreference = (event) => {
    setPreferenceValue(event.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      preference: preferenceValue,
      model: model,
      file_obj: fileObj,
    };

    console.log(payload);

    //*******
    // TEST
    //*******
    // const test = '{"results": [{"original": "Hello", "token": "hello", "bias": 0.9592271269493924, "status": "Unbiased", "synonyms": []}, {"original": "World", "token": "world", "bias": 1.0916986339104908, "status": "Low Biased", "synonyms": []}, {"original": ".", "token": ".", "bias": null, "status": "Unbiased", "synonyms": []}, {"original": "This", "token": "this", "bias": 0, "status": "Unbiased", "synonyms": []}, {"original": "is", "token": "is", "bias": 0, "status": "Unbiased", "synonyms": []}, {"original": "Team", "token": "team", "bias": 1.3988206130738696, "status": "Medium Biased", "synonyms": ["squad", "teamup"]}, {"original": "9", "token": "9", "bias": 0.8822408150125458, "status": "Unbiased", "synonyms": []}, {"original": "from", "token": "from", "bias": 0, "status": "Unbiased", "synonyms": []}, {"original": "UCL", "token": "ucl", "bias": null, "status": "Unbiased", "synonyms": []}, {"original": "CS", "token": "cs", "bias": 1.0831045823240195, "status": "Low Biased", "synonyms": []}, {"original": ".", "token": ".", "bias": null, "status": "Unbiased", "synonyms": []}]}';
    // const biasJson = JSON.parse(test);
    // console.log(biasJson);
    // const retValue = biasJson.results.map((pair) => {
    //     if (pair.status === 'Unbiased') {
    //     return null;
    //     }
    //     return {
    //     bias_word: `${pair.token} (${pair.status})`,
    //     replacement: pair.synonyms.join(', '),
    //     id: uuid()
    //     };
    // }).filter((processedPair) => {
    //     if (processedPair == null) return false;
    //     return true;
    // });
    // console.log(retValue);
    // navigate('/app/generate', {
    //     state: {
    //       bias_response: JSON.stringify(retValue),
    //       file_decoded: fileObj
    //     },
    //     replace: true
    // });
    //*******
    // NO TEST
    //*******
    axios.post('http://127.0.0.1:8000/handle_request', payload)
      .then((response) => {
        const biasJson = JSON.parse(response.data.bias_str);
        console.log(biasJson);
        const retValue = biasJson.results.map((pair) => {
          if (pair.status === 'Unbiased') {
            return null;
          }
          return {
            bias_word: `${pair.token} (${pair.status})`,
            replacement: pair.synonyms.join(', '),
            id: uuid()
          };
        }).filter((processedPair) => {
          if (processedPair == null) return false;
          return true;
        });
        //redirect to app/generate
    navigate('/app/generate', {
      state: {
        bias_response: JSON.stringify(retValue),
        file_decoded: response.data.decoded_str
      },
      replace: true
    });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Paper maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Project Description
        </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={6} justify="center">
            <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">Preference</FormLabel>
                <RadioGroup aria-label="preference" name="preference" value={preferenceValue} onChange={handleChangePreference}>
                  <FormControlLabel value="race" control={<Radio />} label="race" />
                  <FormControlLabel value="gender" control={<Radio />} label="gender" />
                  <FormControlLabel value="language" control={<Radio />} label="language" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Button variant="contained" color="primary" component="span" onClick={handleClick}>
            Upload YOUR CV HERE
          </Button>
          <input accept="/*" onChange={handleChange} className={classes.input} id="icon-button-file" type="file" name="hiddenFile" ref={hiddenFileInput}/>
        </Container>
      </Paper>
      <Container>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Comfirm
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default Preference;
