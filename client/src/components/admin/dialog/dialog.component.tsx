import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { enableEditProductMode } from '@/src/redux/features/products/productSlice';

interface DialogComponentProps {
  children: React.ReactNode;
  buttonText: string;
  dialogTitle: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(children:DialogComponentProps){
  // const [open, setOpen] = React.useState(false);
  const dispatch=useDispatch();
  const open = useSelector((state:RootState) => state.products.editProductMode);


  const handleClickOpen = () => {
    // setOpen(true);
    dispatch(enableEditProductMode(true))
  };

  const handleClose = () => {
    // setOpen(false);
    dispatch(enableEditProductMode(false))

  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {children.buttonText}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',marginBottom:6 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {children.dialogTitle}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        
        {children.children}
      </Dialog>
    </React.Fragment>
  );
}