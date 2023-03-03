import * as React from "react"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class UnsavedDialog extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b"
    }
  }

  render() {
    return (
      <div>
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        You have unsaved changes on "{this.props.protocolName}" ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to discard those ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDiscard}>
            Discard Changes
          </Button>
          <Button onClick={this.props.handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}

class DeleteDialog extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b"
    }
  }

  render() {
    return (
      <div>
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete "{this.props.protocolName}" ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deletion will be permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDelete}>
            Delete
          </Button>
          <Button onClick={this.props.handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}

class SaveDialog extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b"
    }
  }

  render() {
    return (
      <div>
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"How to save this protocol ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You loaded this protocol from the protocol library.<br/> 
            Do you want to save it as a new protocol, or overwrite it ? <br/>
            Overwritten changes will be permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleCreateNew}>
            Create new protocol
          </Button>
          <Button onClick={this.props.handleOverwrite} autoFocus>
            Overwrite
          </Button>
          <Button onClick={this.props.handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}

class UnsavedLogOutDialog extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b"
    }
  }

  render() {
    return (
      <div>
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        You have unsaved changes on "{this.props.protocolName}" ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to discard those ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDiscard}>
            Discard Changes
          </Button>
          <Button onClick={this.props.handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}

export {UnsavedDialog, DeleteDialog, SaveDialog, UnsavedLogOutDialog}
