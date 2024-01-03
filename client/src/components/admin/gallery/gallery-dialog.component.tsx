import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { enableEditImageMode, setCurrentEditingImage } from '@/src/redux/features/images/imageSlice';
import { Box, Fade } from '@mui/material';

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
  return <Fade ref={ref} {...props} />;
});

export default function GalleryFormDialog(props:DialogComponentProps){
  // const [open, setOpen] = React.useState(false);
  const dispatch=useDispatch();
  const open = useSelector((state:RootState) => state.images.editImageMode);


  const handleClickOpen = () => {
    // setOpen(true);
    dispatch(enableEditImageMode(true))
  };

  const handleClose = () => {
    // setOpen(false);
    dispatch(enableEditImageMode(false))
    dispatch(setCurrentEditingImage({}))

  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        {props.buttonText}
      </Button> */}
      <Dialog
        sx={{ 
          padding:'6px'
        }}
        fullScreen={false}
        maxWidth="lg"
        fullWidth
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
              {props.dialogTitle}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box padding="16px">
          {props.children}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}