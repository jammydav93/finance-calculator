import React from 'react';
import {
  CircularProgress,
  withStyles,
} from '@material-ui/core';

const styles = () => ({
  root: {
    margin: 'auto',
    display: 'block',
  },
});

const Loading = ({ classes }) => <CircularProgress className={classes.root} color="secondary"/>

export default withStyles(styles)(Loading);
