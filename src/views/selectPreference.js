import React from 'react';
import Preference from 'src/components/Preference';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SelectPreference = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Train"
    >
      <Preference model='model1' navigate={navigate}/>
    </Page>
  );
};

export default SelectPreference;
