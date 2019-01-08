import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  constructor(props){
      super(props)
  
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
    } = this.props

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {buttonTitle}
        </Button>
        <Dialog
          open={this.state.open}
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
            {dialogueButtons.map((button) => (
              <Button
                onClick={() => {
                  if(button.onClick){
                      button.onClick()
                  };
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

export default AlertDialog;