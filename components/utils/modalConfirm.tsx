import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props:any) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    setOpen(props.open);
  },[props.open])

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onAction}>Si</Button>
          <Button onClick={props.onClose} autoFocus>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
