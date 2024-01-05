import { deleteImage } from '@/src/api/images/images';
import { toggleAddSelectedImageId, enableEditImageMode, setCurrentEditingImage } from '@/src/redux/features/images/imageSlice';
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar';
import { Stack, IconButton, Paper } from '@mui/material';
import React from 'react'
import { useQueryClient, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Image } from '@/images/images.types';
import { RootState } from '@/src/redux/store';

type Props = {}

const ImageControllers=({ image }: { image: Image }) => {
  const [toggle,setToggle]=React.useState(false);
  const queryClient = useQueryClient();
  const dispatch=useDispatch()
  const selectedImagesId=useSelector((state:RootState) => state.images.selectedImagesId)
  const imageIsSelected = selectedImagesId.includes(image._id);
  const isImageSelectMode = useSelector((state:RootState) => state.images.imageSelectMode);
  const { mutate:deleteMutate, isLoading:deleteLoading } = useMutation(deleteImage, {
    onSuccess: data => {
    dispatch(setSnackbar({message:"Image deleted", severity:"warning",snackbarOpen:true}))
  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
        queryClient.invalidateQueries('images')
  }
  });

  const handleAddToggle=()=>{
    dispatch(toggleAddSelectedImageId(image?._id))
    setToggle((oldState) => !oldState)
  }

  return(
    <>
      <Paper elevation={1} sx={{ position:'relative' }}>
      <Stack flexDirection="row" justifyContent='space-between' sx={{minWidth:'100%', position:'absolute', paddingLeft:1,paddingRight:1,top:6 }}>
        <Stack>
          {isImageSelectMode ? (
            <>
            {
              // selectedImages.includes(`${image?._id}`) ? (
              imageIsSelected ? (
                <IconButton
                    color='inherit'
                    size="small"
                    onClick={handleAddToggle}
                    sx={{  marginBottom: '6px' }}
                >
                  <RadioButtonCheckedIcon fontSize='small' />
                </IconButton>
              ) : (
                <IconButton
                  color='inherit'
                  size="small"
                  onClick={handleAddToggle}
                  sx={{  marginBottom: '6px' }}
                >
                  <RadioButtonUncheckedIcon fontSize='small' />
                </IconButton>
              )
            }
          </>
          ):null}
        </Stack>
        <Stack flexDirection='column' justifyContent='flex-start'>
          <IconButton size="small" 
          onClick={() => {
            dispatch(enableEditImageMode(true));
            dispatch(setCurrentEditingImage(image._id));
          }}
          sx={{ backgroundColor:'whitesmoke', marginBottom:'6px' }}>
            <ModeEditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ backgroundColor:'whitesmoke' }} onClick={() => deleteMutate(image._id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
      <img
        id={image?._id}
        src={`http://localhost:8080/${image.imagePath}`}
        alt={``}
        style={{ width: '250px', height: '250px', marginRight: '5px', marginBottom: '5px' }}
      />
    </Paper>
    </>
  )
}

export default ImageControllers