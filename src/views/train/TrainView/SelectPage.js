import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';
import Pretrain from './Pretrain';
import Corpus from './Corpus';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  }
}));

const SelectPage = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={6}
          >
            <Pretrain />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Corpus />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
SelectPage.propTypes = {
  className: PropTypes.string
};

export default SelectPage;
