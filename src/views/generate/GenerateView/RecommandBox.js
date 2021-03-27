import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  InputLabel,
  FormControl,
  NativeSelect,
  InputBase,
  withStyles,
  makeStyles
} from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const RecommandBox = ({ className, ...rest }) => {
  const classes = useStyles();

  const [word, setWord] = React.useState('');
  const handleChange = (event) => {
    setWord(event.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox">individual replacement</InputLabel>
        <BootstrapInput id="demo-customized-textbox" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="demo-customized-select-native">auto</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={word}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={10}>word1</option>
          <option value={20}>word2</option>
          <option value={30}>worf3</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
};

RecommandBox.propTypes = {
  className: PropTypes.string
};

export default RecommandBox;
