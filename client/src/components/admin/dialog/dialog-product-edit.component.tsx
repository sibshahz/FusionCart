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
import { enableAddProductMode, toggleProductEditDialog } from '@/src/redux/features/products/productSlice';
import { useAppSelector } from '@/src/redux/hooks';
import D_ProductEditForm from '../product/d_product-edit-form.component';
import { resetFilteredImages, resetSelectedImages } from '@/src/redux/features/images/imageSlice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductEditDialog(){
  // const [open, setOpen] = React.useState(false);
  const dispatch=useDispatch();
  const productEditDialogOpen = useAppSelector((state:RootState) => state.products.productEditDialogOpen);


  const handleClickOpen = () => {
    // // setOpen(true);
    // dispatch(enableAddProductMode(true))
  };

  const handleClose = () => {
    // setOpen(false);
    dispatch(toggleProductEditDialog());
    dispatch(resetSelectedImages())
    dispatch(resetFilteredImages())

  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        {children.buttonText}
      </Button> */}
      <Dialog
        fullScreen
        open={productEditDialogOpen}
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
              Edit Product
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <D_ProductEditForm />
      </Dialog>
    </React.Fragment>
  );
}