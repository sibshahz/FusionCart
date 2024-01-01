import React from 'react'
import { Stack, FormGroup, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form';
import { enableEditImageMode, setCurrentEditingImage, updateCurrentEditingImage } from '@/src/redux/features/images/imageSlice';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar';
import { updateImage } from '@/src/api/images/images';
import { RootState } from '@/src/redux/store';

type Props = {}
type Inputs = {
  _id:string,
  imageTitle: string,
  imageAlt: string,
  imageDescription:string,
}

const ImageMetaForm = (props: Props) => {

const dispatch=useDispatch();
const queryClient = useQueryClient();
const currentEditingImage=useSelector((state:RootState) => state.images.currentEditingImage);
const editImageMode = useSelector((state:RootState) => state.images.editImageMode)

const {
  register,
  handleSubmit,
  watch,
  reset,
  getValues,
  setValue,
  formState: { errors },
} = useForm<Inputs>();

const { mutate:mutateUpdate, isLoading:updateLoading } = useMutation(updateImage, {
  onSuccess: data => {
  dispatch(updateCurrentEditingImage(data));
  dispatch(enableEditImageMode(false));
  dispatch(setCurrentEditingImage({}))
  reset({ imageTitle: '',imageAlt:'',imageDescription:''})
  dispatch(setSnackbar({message:"Image meta data updated", severity:"success",snackbarOpen:true}))
},
  onError: (error) => {
    console.log("there was an error: ",error)
},
  onSettled: () => {
    queryClient.invalidateQueries('images')
}
});

React.useEffect(()=>{
  if(currentEditingImage && editImageMode){
    setValue("_id",currentEditingImage?._id);
    setValue("imageTitle", currentEditingImage?.imageTitle);
    setValue("imageDescription", currentEditingImage.imageDescription);
    setValue("imageAlt", currentEditingImage.imageAlt);
  }
},[editImageMode,currentEditingImage])
const handleUpdateEdit=()=>{
  if(currentEditingImage){
    const values=getValues();
    values._id=currentEditingImage?._id;
    console.log("UPDATING IMAGE: ", values)
    mutateUpdate(values);
  }
  reset();
}
  return (
    <>
    <Stack direction="column">
      <form 
        onSubmit={handleSubmit((data) => {
          mutateUpdate(data);
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
              autoComplete="false" 
              defaultValue=" "
              value={watch("imageAlt")}
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
        <Button sx={{ marginRight:2 }} variant='contained' onClick={() => handleUpdateEdit()}>Save metadata</Button>
      </form>
      </Stack>
    </>
  )
}

export default ImageMetaForm