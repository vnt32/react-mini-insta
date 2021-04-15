import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState({
      title: 'Уверены?',
      text: 'Вы увереный, что хотите это сделать?',
      cancelText: 'Отмена',
      acceptText: 'Уверен'
  })

  const res = useRef(null);
  const setRes = (e) => res.current = e;
  const rej = useRef(null);
  const setRej = (e) => rej.current = e;

  const handleOpenAlert = (data) => {
      return new Promise((resolve,reject) => {
          setRes(resolve)
          setRej(reject)
          setDialog(p => ({...p, ...data }))
          setOpen(true)
      })
  };

  useImperativeHandle(ref, () => ({
    handleOpenAlert
}))

  const handleClose = () => {
    setOpen(false);
    if(rej.current != null) rej.current()
  };

  const handleAccept = () => {
    setOpen(false);
    if(res.current != null) res.current()
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth='xs'
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialog.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {dialog.cancelText}
          </Button>
          <Button onClick={handleAccept} color="primary" autoFocus>
            {dialog.acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})