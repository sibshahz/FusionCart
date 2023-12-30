"use client"
import React from 'react'
import { Stack, FormGroup, TextField, FormHelperText, Button } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch,useSelector } from 'react-redux';

import CustomizedSnackbars from '../snackbar/snackbar.component';
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar';
import { postImages } from '@/src/api/images/images';
import Grid from '@mui/material/Unstable_Grid2';

type Inputs = {
  imageTitle: string,
  imageAlt: string,
  imageDescription:string,
}
const D_ImageForm = () => {
  const dispatch=useDispatch();
  const [imageIndex,setImageIndex] = React.useState();
  const [imagesData,setImagesData] = React.useState();

  
  const queryClient = useQueryClient();
  const { mutate:mutatePostImages, isLoading:imagesLoading } = useMutation(postImages, {
    onSuccess: data => {
    dispatch(setSnackbar({message:"Images uploaded", severity:"success",snackbarOpen:true}))
    setImagesData([])   
  },
    onError: (error) => {
      console.log("there was an error: ",error)
  },
    onSettled: () => {
      queryClient.invalidateQueries('images')
  }
  });



  const onChange = (e) => {
    const dataArray = [];
  
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const fileData = {
          imageTitle: '',
          imageAlt: '',
          imageDescription: '',
          imagePath: reader.result,
        };
  
        dataArray.push(fileData);
  
        setImagesData((prevData) => (prevData ? [...prevData, fileData] : [fileData]));
      };
  
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  
    e.target.value = '';
  };


  

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  
  const editImage=(index)=>{
    setValue("imageTitle",imagesData[index]?.imageTitle);
    setValue("imageAlt",imagesData[index]?.imageAlt,);
    setValue("imageDescription",imagesData[index]?.imageDescription);
    setImageIndex(index);
  };
  
  const updateMetadata=()=>{
    const updatedImage = {
      imageTitle: getValues("imageTitle"),
      imageAlt: getValues("imageAlt"),
      imageDescription: getValues("imageDescription"),
      imagePath:imagesData[imageIndex].imagePath
    };

    // Clone the existing imagesData array
    const updatedImagesData = [...imagesData];

    // Update the value at the specified index
    updatedImagesData[imageIndex] = updatedImage;

    // Set the state with the updated array
    setImagesData(updatedImagesData);

    reset();
  };

  const uploadImages=()=>{
    mutatePostImages(imagesData);
  }
  return (
    <Stack direction="column">
      <Stack mb={2} mt={2} direction='row'>
          <input 
            onChange={onChange}
            type="file"
            name="file"
            multiple
          />
      </Stack>

      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Stack flexDirection="row" gap={2} mt={2} mb={2} flexWrap="wrap">
          {
            imagesData?.map((link, index) => (
              <img
                key={index}
                src={link.imagePath}
                onClick={() => editImage(index)}
                alt={`Preview ${index + 1}`}
                style={{ width: '150px', height: '150px', marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Stack>
          {
            imagesData?.length > 0 ? <Button sx={{ marginRight:2 }} variant='contained' onClick={() => uploadImages()}>Upload {imagesData?.length} files</Button> : null
          }
          {
            imagesData?.length > 0 ? <Button variant='outlined' onClick={() => setImagesData([])}>Cancel</Button> : null
          }
        </Grid>

        <Grid xs={12} md={4}>
          {
            imagesData?.length > 0 && (
              <Stack direction="column">
              <form 
                onSubmit={handleSubmit((data) => {
                  mutatePostImages(data);
                  reset();
                })} >
                <Stack direction="column" rowGap={2} mb={2}>
                  <FormGroup>
                    <TextField 
                      id="image-name" 
                      label="Name" 
                      variant="outlined" 
                      autoComplete="false"
                      defaultValue=" "
                      value={watch("imageTitle")}
                      {...register("imageTitle", {required: false})}
                    />
                  </FormGroup>
  
                  <FormGroup>
                    <TextField 
                      id="image-alt" 
                      label="Alt"
                      variant="outlined"
                      value={watch("imageAlt")}
                      autoComplete="false" 
                      defaultValue=" "
                      {...register("imageAlt", {required: false})}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <TextField 
                      id='image-description'
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      defaultValue=" "
                      value={watch("imageDescription")}
                      {...register("imageDescription")}
                    />
                  </FormGroup>
  
                </Stack>
                <Button sx={{ marginRight:2 }} variant='contained' onClick={updateMetadata}>Save metadata</Button>
              </form>
            </Stack>
            )
          }

        </Grid>
      </Grid>
      <CustomizedSnackbars />
    </Stack>
  )
}

export default D_ImageForm