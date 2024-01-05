
import React from 'react'
import { useQuery } from 'react-query'
import {Image} from '@/images/images.types'


import { getImagesList } from '@/src/api/images/images'
import {  Button, Paper, Stack, Typography } from '@mui/material'
import CustomizedSnackbars from '../snackbar/snackbar.component';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedImages, enableEditImageMode, setFilteredImages, setImages, toggleAddSelectedImageId } from '@/src/redux/features/images/imageSlice';
import { RootState } from '@/src/redux/store';
import ImageControllers from './image-controller.component'
import { useAppSelector } from '@/src/redux/hooks'

type Props = {}



const GalleryList = (props: Props) => {
  
  const dispatch=useDispatch();
  const imageSelectMode = useSelector((state:RootState) => state.images.imageSelectMode);
  const images=useAppSelector((state:RootState) => state.images.images)
  const selectedImagesLength = useSelector((state:RootState) => state.images.selectedImagesId.length);
  const filteredImages = useAppSelector((state:RootState) => state.images.filteredImages)
  const { isLoading, isError, data, error } = useQuery('images', getImagesList);
  
  
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
        {images?.map((image: Image, index:number) => (
          <div key={index}>
            <ImageControllers 
            image={image}
            />
          </div>
        ))}
      </Stack>
      {
        (
          imageSelectMode && (selectedImagesLength > 0)) && (
          <Button onClick={()=>{dispatch(addSelectedImages()),dispatch(setFilteredImages()),dispatch(enableEditImageMode(false))}} variant="contained" >Add images</Button>
        )        
      }
      <CustomizedSnackbars />
    </>
  );
};

export default GalleryList;
