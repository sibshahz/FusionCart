"use client"
import React from 'react'
import { Stack, FormGroup, TextField, FormHelperText, Button } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from 'react-query';
import { postTag,updateTag } from '@/src/api/tags/tags';
import { useDispatch,useSelector } from 'react-redux';
import { enableEditTagMode, setCurrentEditingTag, updateCurrentEditingTag } from '@/src/redux/features/tags/tagSlice';
import { RootState } from '@/src/redux/store';
import {Tag} from '../../../../../common/tags/tags.types';
import CustomizedSnackbars from '../snackbar/snackbar.component';
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar';

type Props = {}
type Inputs = {
  tagName: string
  tagSlug: string
  tagDescription:string
}

const D_TagForm = (props: Props) => {
  const dispatch=useDispatch();
  const editTagMode = useSelector((state:RootState) => state.tags.editTagMode)
  const currentEditingTag=useSelector((state:RootState) => state.tags.currentEditingTag);
  
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postTag, {
    onSuccess: data => {
    dispatch(setSnackbar({message:"New tag added", severity:"success",snackbarOpen:true}))
      // dispatch(setUser(data));    
    // router.push('/dashboard')   
  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
        queryClient.invalidateQueries('tags')
  }
  });

  const { mutate:mutateUpdate, isLoading:updateLoading } = useMutation(updateTag, {
    onSuccess: data => {
    dispatch(updateCurrentEditingTag(data));
    dispatch(enableEditTagMode(false));
    dispatch(setCurrentEditingTag({}))
    reset({ tagName: '',tagDescription:'',tagSlug:'' })
    dispatch(setSnackbar({message:"Tag data updated", severity:"success",snackbarOpen:true}))

    // router.push('/dashboard')   
  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
        queryClient.invalidateQueries('tags')
  }
  });

  const handleCancelEdit=()=>{
    // reset({"tagName","tagSlug""tagDescription"})
    reset({ tagName: '',tagDescription:'',tagSlug:'' })
    dispatch(setCurrentEditingTag({}))
    dispatch(enableEditTagMode(false))
    dispatch(setSnackbar({message:"Edit cancelled", severity:"info",snackbarOpen:true}))
  }
  const handleUpdateEdit=()=>{
    if(currentEditingTag){
      const values=getValues();
      values._id=currentEditingTag._id;
      mutateUpdate(values);
    }
    reset();
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  
  React.useEffect(()=>{
    if(editTagMode && currentEditingTag){
      setValue('tagName',currentEditingTag?.tagName)
      setValue('tagSlug',currentEditingTag?.tagSlug)
      setValue('tagDescription',currentEditingTag?.tagDescription);
    }
  },[editTagMode,currentEditingTag])

  return (
    <>
       <form 
          onSubmit={handleSubmit((data) => {
            mutate(data);
            reset();
          })} >
          <Stack direction="column" rowGap={2}>
            <FormGroup>
              <TextField 
                id="tag-name" 
                label="Name" 
                variant="outlined" 
                autoComplete="false"
                defaultValue=" "
                value={watch("tagName")}
                // onChange={(e) => setValue("tagName", e.target.value)}
                {...register("tagName", {required: true})}
              />
              {errors.tagName && <FormHelperText error filled>Tag name is required</FormHelperText>}
            </FormGroup>

            <FormGroup>
              <TextField 
                id="tag-slug" 
                label="Slug"
                variant="outlined"
                value={watch("tagSlug")}
                autoComplete="false" 
                defaultValue=" "
                // onChange={(e) => setValue("tagSlug", e.target.value)}
                {...register("tagSlug", {required: true})}
              />
              {errors.tagSlug && <FormHelperText error filled>Tag slug is required</FormHelperText>}
            </FormGroup>
            
            <FormGroup>
              <TextField 
                label="Description"
                multiline
                rows={8}
                variant="outlined"
                defaultValue=" "
                value={watch("tagDescription")}
                // onChange={(e) => setValue("tagDescription", e.target.value)}
                {...register("tagDescription")}
              />
            </FormGroup>
          {
            editTagMode && currentEditingTag && (
              <Stack direction='row' gap={2}>
                <Button variant="contained" size="large" onClick={handleUpdateEdit}>Update tag</Button>
                <Button variant="contained" size="large" onClick={handleCancelEdit}>Cancel</Button>
              </Stack>
            )
          }

          {
            !editTagMode && (
              <Stack direction='row'>
                <Button variant="contained" size="large" type='submit'>
                  Add new tag
                </Button>
              </Stack>
            )
            
          }
          </Stack>
        </form>
        <CustomizedSnackbars />
    </>
  )
}

export default D_TagForm