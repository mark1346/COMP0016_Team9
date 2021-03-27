import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';

import axios from 'axios';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));
const FileUploader = () => {
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  const classes = useStyles();
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    toBase64(fileUploaded).then(
      (encodedData) => localStorage.setItem('file_obj', encodedData)
    );
  };
  const handleSubmit = () => {
    const payload = {
      race: localStorage.getItem('race_saved'),
      gender: localStorage.getItem('gender_saved'),
      age: localStorage.getItem('age_saved'),
      model1: localStorage.getItem('model1'),
      model2: localStorage.getItem('model2'),
      model3: localStorage.getItem('model3'),
      file_obj: localStorage.getItem('file_obj'),
    };

    console.log(payload);

    axios.post('http://127.0.0.1:8000/handle_request', payload)
      .then((response) => {
        const biasJson = JSON.parse(response.data.ocr_str);
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
        localStorage.setItem('bias_response', JSON.stringify(retValue));
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {/* <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input
        type="file"
        name="hiddenFile"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <Button className={classes.exportButton}>
        DOWNLOAD
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={handleSubmit}
      >
        SUBMIT
      </Button> */}
    </>
  );
};

const Toolbar = ({ className, parentCallback, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <FileUploader />
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  parentCallback: PropTypes.func
};

export default Toolbar;
