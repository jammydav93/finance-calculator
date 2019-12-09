import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Snackbar,
  SnackbarContent,
  IconButton,
  colors,
  withStyles,
} from '@material-ui/core';

import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
} from '@material-ui/icons';

import { connect } from 'react-redux';
import store from '../../redux/store';
import { clearNotification } from '../../redux/actions';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: colors.green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: colors.amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const {
    classes, className, message, onClose, variant, ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.defaultProps = {
  className: '',
  message: {},
  onClose: () => ({}),
};

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class CustomizedSnackbars extends React.Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    store.dispatch(clearNotification());
  };

  render() {
    const { notification } = this.props;
    const {
      level,
      message,
    } = notification;

    const showNotification = true;

    if (!level || !message) {
      return null;
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showNotification}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={level}
            message={message}
          />
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbars.defaultProps = {
  notification: {
    level: null,
    message: null,
  },
};

CustomizedSnackbars.propTypes = {
  notification: PropTypes.shape({
    level: PropTypes.string,
    message: PropTypes.string,
  }),
};

const StyledSnackbars = withStyles(styles2)(CustomizedSnackbars);

const mapStateToProps = state => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(StyledSnackbars);
