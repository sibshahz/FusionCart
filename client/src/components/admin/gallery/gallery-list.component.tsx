
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {Image} from '@/images/images.types'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useAppDispatch } from '@/src/redux/hooks'
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar'
import { deleteImage, getImagesList } from '@/src/api/images/images'
import { Box, Button, Divider, IconButton, Paper, Popover, Stack, Typography } from '@mui/material'
import CustomizedSnackbars from '../snackbar/snackbar.component';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedImages, enableEditImageMode, setCurrentEditingImage, setImages, toggleAddSelectedImageId } from '@/src/redux/features/images/imageSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { RootState } from '@/src/redux/store';

type Props = {}

const ImageIconControllers=({ imageId }: { imageId: string }) => {
  const [toggle,setToggle]=React.useState(false);
  const dispatch=useDispatch()

  const handleAddToggle=()=>{
    dispatch(toggleAddSelectedImageId(imageId))
    setToggle((oldState) => !oldState)
  }
  return(
    <Stack flexDirection="row" justifyContent='space-between' sx={{minWidth:'100%', position:'absolute', paddingLeft:1,paddingRight:1,top:6 }}>
      <Stack>
      <IconButton 
        color={toggle ? 'success' : 'inherit' }
        size="small"
        // onClick={() => dispatch(toggleAddSelectedImageId(imageId))}
        onClick={handleAddToggle}
        sx={{  marginBottom: '6px' }}
      >
          <AddCircleIcon fontSize='small' />
        </IconButton>
      </Stack>
      <Stack flexDirection='column' justifyContent='flex-start'>
        <IconButton size="small" 
        onClick={() => {
          dispatch(enableEditImageMode(true));
          dispatch(setCurrentEditingImage(imageId));
        }}
        sx={{ backgroundColor:'whitesmoke', marginBottom:'6px' }}>
          <ModeEditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ backgroundColor:'whitesmoke' }} onClick={() => deleteMutate(imageId)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  )
}

const GalleryList = (props: Props) => {
  const queryClient = useQueryClient();
  const dispatch=useDispatch();
  const imageSelectMode = useSelector((state:RootState) => state.images.imageSelectMode);
  const selectedImagesLength = useSelector((state:RootState) => state.images.selectedImagesId.length);
  const { isLoading, isError, data, error } = useQuery('images', getImagesList);
  
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
  
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: Cannot load images</span>;
  }

  if(data){
    dispatch(setImages(data));
  }


  return (
    <>
      <Stack flexDirection="row" gap={2} mt={2} mb={2} flexWrap="wrap" minWidth="100%">
        {data?.map((link: Image, index:number) => (
          <Paper key={index} elevation={1} sx={{ position:'relative' }}>
            <ImageIconControllers imageId={link?._id} />
            <img
              id={link?._id}
              src={`http://localhost:8080/${link.imagePath}`}
              alt={``}
              style={{ width: '250px', height: '250px', marginRight: '5px', marginBottom: '5px' }}
            />
          </Paper>
        ))}
      </Stack>
      {
        (imageSelectMode && (selectedImagesLength > 0)) && (
          <Button onClick={()=>{dispatch(addSelectedImages()),dispatch(enableEditImageMode(false))}} variant="contained" >Add images</Button>
        )        
      }
      <CustomizedSnackbars />
    </>
  );
};

export default GalleryList;
