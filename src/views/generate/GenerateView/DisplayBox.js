import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  }
}));

const DisplayBox = ({ className, file_decoded, ...rest }) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subheader="original txt file"
      />
      <Divider />
      <CardContent>
        <Typography>
          {file_decoded}
        </Typography>
      </CardContent>
    </Card>
  );
};
DisplayBox.propTypes = {
  className: PropTypes.string
};

export default DisplayBox;
