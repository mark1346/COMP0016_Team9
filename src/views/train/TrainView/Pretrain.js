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

const Pretrain = ({ className, ...rest }) => {
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
              control={<Checkbox />}
              label="corpus"
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
              control={<Checkbox />}
              label="corpus2"
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
              control={<Checkbox />}
              label="corpus3"
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
Pretrain.propTypes = {
  className: PropTypes.string
};

export default Pretrain;
