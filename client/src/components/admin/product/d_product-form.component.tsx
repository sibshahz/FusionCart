"use client"
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FormGroup, TextField,Stack, Button, FormHelperText, Typography, Box, IconButton} from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"
import { postProduct, updateProduct } from '@/src/api/products/products';
import { setSnackbar } from '@/src/redux/features/snackbar/snackbar';
import { useQueryClient, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '@/product/product.types';
import { enableAddProductMode, enableEditProductMode, setCurrentEditingProduct, updateCurrentEditingProduct } from '@/src/redux/features/products/productSlice';
import CustomizedSnackbars from '../snackbar/snackbar.component';
import { RootState } from '@/src/redux/store';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { enableImageSelectMode, removeFromFilteredImages, resetAddSelectedImageId, resetFilteredImages, resetSelectedImages, setFilteredImages, toggleAddSelectedImageId } from '@/src/redux/features/images/imageSlice';
import ImageSelectorDialog from '../gallery/image-selector-dialog.component';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Image } from '@/images/images.types';


type Props = {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  fontSize:theme.spacing(2),
  color: theme.palette.text.secondary,
  borderRadius:0,
}));

type Inputs = {
  name: string,
  description: string,
  price:Number,
  images:Image[],
  salePrice:Number,
  stock:Number,
  tagline:string,
}
function D_ProductAddForm({}: Props) {
  
  const dispatch=useDispatch();
  const selectedImagesId = useSelector((state:RootState) => state.images.selectedImagesId)
  const filteredImages=useSelector((state:RootState) => state.images.filteredImages)

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postProduct, {
    onSuccess: data => {
    dispatch(setSnackbar({message:"New product added", severity:"success",snackbarOpen:true}))
    // dispatch(resetSelectedImages())
    dispatch(resetFilteredImages());
    dispatch(resetAddSelectedImageId())

  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
        queryClient.invalidateQueries('products')
  }
  });

  const handlePostProduct=(data:Product)=>{
    const dataPost:Product=({...data,images:selectedImagesId})
    mutate(dataPost);
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>()

  // React.useEffect(()=>{
  //   if(!editProductMode && !currentEditingProduct){
  //     dispatch(setFilteredImages());
  //   }
  // },[editProductMode,currentEditingProduct])

  return (
    <Grid container spacing={2} maxWidth="100%">
      <Grid xs={12} md={8} lg={9}>
        <Item elevation={1}>
        <form
          onSubmit={handleSubmit((data) => {
            // mutate(data);
            handlePostProduct(data);
            reset({name:"",description:"",price:"",salePrice:"",stock:"",images:[],tagline:""});
          })}
        >
          
          <Stack direction="column" rowGap={2}>
            <FormGroup>
              <TextField 
                id="product-name" 
                label="Product Name" 
                variant="outlined" 
                autoComplete="false" 
                value={watch("name")} 
                {...register("name", {required: true})}
              />
              {errors.name && <FormHelperText error filled>Product name is required</FormHelperText>}
            </FormGroup>
            
            <FormGroup>
              <TextField 
                label="Product Description"
                multiline
                rows={8}
                variant="outlined"
                value={watch("description")}
                {...register("description", { required: true })}
              />
              {errors.description && <FormHelperText error filled>Description of product is required</FormHelperText>}

            </FormGroup>
            <FormGroup>
              <TextField 
                id="product-tagline" 
                label="Tagline" 
                variant="outlined" 
                autoComplete="false" 
                value={watch("tagline")} 
                {...register("tagline", {required: false})}
              />
            </FormGroup>

            <FormGroup>
              <Button size="large" variant='outlined' fullWidth={false} onClick={() => dispatch(enableImageSelectMode(true))}><AddBoxIcon /> Add Media</Button>
            </FormGroup>
              <Stack flexDirection="row" gap={2} mt={2} mb={2} flexWrap="wrap" minWidth="100%">
                {
                  filteredImages?.map((link:Image, index:number) => (
                  <Paper key={index} elevation={1} sx={{ position:'relative' }}>
                    <IconButton onClick={()=>{ dispatch(removeFromFilteredImages(link?._id),dispatch(toggleAddSelectedImageId(link?._id)))}}
                    sx={{ position:'absolute', paddingLeft:1,paddingRight:1,top:6,right:6 }}>
                      <RemoveCircleIcon fontSize='small' />
                    </IconButton>
                    <img
                      id={link?._id}
                      src={`http://localhost:8080/${link.imagePath}`}
                      alt={``}
                      style={{ width: '250px', height: '250px', marginRight: '5px', marginBottom: '5px' }}
                    />
                  </Paper>
                ))}
              </Stack>
              
            <Stack rowGap={2}>
              <Typography>Product data:</Typography>
              <Stack direction={{ sm:'column',md:'row' }} gap={2}>
                <Stack>
                  <TextField 
                    id="product-reg-price" 
                    label="Regular price" 
                    variant="outlined" 
                    autoComplete="false"
                    value={watch("price")} 
                    {...register("price", {required: true})}
                  />
                  {errors.price && <FormHelperText error filled>Product price is required</FormHelperText>}
                </Stack>
                <Stack>
                  <TextField 
                    id="product-sale-price" 
                    label="Sale price" 
                    variant="outlined" 
                    autoComplete="false"
                    value={watch("salePrice")} 
                    {...register("salePrice", {required: false})}
                  />
                </Stack>
                <Stack>
                  <TextField 
                    id="product-inventory" 
                    label="Inventory" 
                    variant="outlined" 
                    autoComplete="false" 
                    value={watch("stock")}
                    {...register("stock", {required: false})}
                  />
                </Stack>
              </Stack>
            </Stack>
          
          <Stack direction='row'>
            <Button variant="contained" size="large" type='submit'>
                Add product
            </Button>
          </Stack>

          </Stack>

        </form>
        <ImageSelectorDialog />
        <CustomizedSnackbars />
        </Item>
      </Grid>
      <Grid xs={12} md={4} lg={3}>
        <Item>xs=4</Item>
      </Grid>
    </Grid>
  )
}

export default D_ProductAddForm;