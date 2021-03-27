import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Typography,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Box,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  }
}));

const toggleCheckboxChange = (e) => {
  e.preventDefault();
  if (e.target.type === 'checkbox') {
    localStorage.setItem(e.target.name, e.target.checked);
  }
};

const Corpus = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box minWidth={400}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox onChange={toggleCheckboxChange} name="model1" />}
              label="model1"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary">
              description
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions2-content"
            id="additional-actions2-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox onChange={toggleCheckboxChange} name="model2" />}
              label="model2"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary">
              description
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions3-content"
            id="additional-actions3-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox onChange={toggleCheckboxChange} name="model3" />}
              label="model3"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary">
              description
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};
Corpus.propTypes = {
  className: PropTypes.string
};

export default Corpus;
