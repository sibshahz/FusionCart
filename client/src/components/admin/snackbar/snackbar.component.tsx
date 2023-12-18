import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useSelector,useDispatch } from 'react-redux';
import { resetSnackbar } from '@/src/redux/features/snackbar/snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { RootState } from '@/src/redux/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  // const [open, setOpen] = React.useState(false);
  const open=useSelector((state:RootState) => state.snackbar.snackbarOpen);
  const message=useSelector((state:RootState) => state.snackbar.message);
  const severity=useSelector((state:RootState) => state.snackbar?.severity);
  const dispatch=useDispatch();
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    dispatch(resetSnackbar());
  };

  return (
    <>
    {/* // <Stack spacing={2} sx={{ width: '100%' }}> */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    {/* // </Stack> */}
    </>
  );
}
