import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      buttonTitle,
      dialogueText,
      dialogueButtons,
    } = this.props;

    const {
      open,
    } = this.state;

    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen}>
          {buttonTitle}
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{buttonTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogueText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {dialogueButtons.map(button => (
              <Button
                onClick={() => {
                  if (button.onClick) {
                    button.onClick();
                  }
                  this.handleClose();
                }}
                color={button.type}
              >
                {button.text}
              </Button>
            ))}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  dialogueText: PropTypes.string.isRequired,
  dialogueButtons: PropTypes.string.isRequired,
};

export default AlertDialog;
