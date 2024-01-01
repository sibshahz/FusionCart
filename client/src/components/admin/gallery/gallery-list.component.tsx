
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {Image} from '@/images/images.types'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useAppDispatch } from '@/src/redux/hooks'
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar'
import { deleteImage, getImagesList } from '@/src/api/images/images'
import { Box, Divider, IconButton, Paper, Popover, Stack, Typography } from '@mui/material'
import CustomizedSnackbars from '../snackbar/snackbar.component';
import { useDispatch } from 'react-redux';
import { enableEditImageMode, setCurrentEditingImage, setImages } from '@/src/redux/features/images/imageSlice';

type Props = {}

const GalleryList = (props: Props) => {
  const queryClient = useQueryClient();
  const dispatch=useDispatch();
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
            <Stack flexDirection='column' justifyContent='end' sx={{ position:'absolute', right:8,top:6 }}>
              <IconButton size="small" sx={{ backgroundColor:'whitesmoke', marginBottom:'6px' }}>
                <ModeEditIcon fontSize="small" onClick={() => {dispatch(enableEditImageMode(true)),dispatch(setCurrentEditingImage(link._id))}} />
              </IconButton>
              <IconButton size="small" sx={{ backgroundColor:'whitesmoke' }} onClick={() => deleteMutate(link?._id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
            <img
              id={link?._id}
              src={`http://localhost:8080/${link.imagePath}`}
              alt={``}
              style={{ width: '250px', height: '250px', marginRight: '5px', marginBottom: '5px' }}
            />
          </Paper>
        ))}
      </Stack>
      <CustomizedSnackbars />
    </>
  );
};

export default GalleryList;
