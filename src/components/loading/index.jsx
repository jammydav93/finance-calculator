import React from 'react';
import {
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    margin: 'auto',
    display: 'block',
  },
});

const Loading = ({ classes }) => <CircularProgress className={classes.root} color="secondary" />;

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
