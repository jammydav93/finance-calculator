import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import LoadButton from '../Load';
import SaveButton from '../Save';
import SignInButton from '../Signin';
import SignOutButton from '../Signout';
import Loading from '../Loading';

const mapStateToProps = (state) => {
  const {
    authUser,
    loading,
  } = state.sessionState;

  return {
    authUser,
    loading,
  };
};

const showAuthedNavBar = authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />);

const NavigationAuth = () => (
  <React.Fragment>
    <LoadButton />
    <SaveButton />
    <SignOutButton />
  </React.Fragment>
);

const NavigationNonAuth = () => (
  <SignInButton />
);

const styles1 = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes, loading, authUser } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            MoneyFlux
          </Typography>
          {loading ? <Loading /> : showAuthedNavBar(authUser)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.defaultProps = {
  authUser: {},
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  authUser: PropTypes.object,
};

const styledAppBar = withStyles(styles1)(ButtonAppBar);


export default connect(mapStateToProps)(styledAppBar);
