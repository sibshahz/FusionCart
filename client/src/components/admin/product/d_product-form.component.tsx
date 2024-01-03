"use client"
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FormGroup, TextField,Stack, Button, FormHelperText, Typography, Box} from '@mui/material';
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
import { enableImageSelectMode, resetSelectedImages } from '@/src/redux/features/images/imageSlice';
import ImageSelectorDialog from '../gallery/image-selector-dialog.component';


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
  images:string[],
  salePrice:Number,
  stock:Number,
}
function D_ProductForm({}: Props) {
  
  const dispatch=useDispatch();
  const editProductMode = useSelector((state:RootState) => state.products.editProductMode)
  const imageSelectMode = useSelector((state:RootState) => state.images.imageSelectMode)
  const currentEditingProduct = useSelector((state:RootState) => state.products.currentEditingProduct)
  const selectedImages = useSelector((state:RootState) => state.images.selectedImages)

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postProduct, {
    onSuccess: data => {
    dispatch(setSnackbar({message:"New product added", severity:"success",snackbarOpen:true}))
    dispatch(resetSelectedImages())

      // dispatch(setUser(data));    
    // router.push('/dashboard')   
  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
        queryClient.invalidateQueries('products')
  }
  });

  const { mutate:mutateUpdate, isLoading:updateLoading } = useMutation(updateProduct, {
    onSuccess: data => {
    dispatch(updateCurrentEditingProduct(data));
    dispatch(enableEditProductMode(false));
    dispatch(setCurrentEditingProduct({}))
    reset({ name: '',description:'',price:'',salePrice:'',stock:'' })
    dispatch(setSnackbar({message:"Product data updated", severity:"success",snackbarOpen:true}))
  },
    onError: (error) => {
      console.log("there was an error: ",error)
  },
    onSettled: () => {
      queryClient.invalidateQueries('products')
  }
  });
  const handleCancelEdit=()=>{
    reset({ name:'',description:'',price:'',salePrice:'',stock:'' })
    dispatch(setCurrentEditingProduct({}))
    dispatch(enableEditProductMode(false))
    dispatch(setSnackbar({message:"Edit cancelled", severity:"info",snackbarOpen:true}))
  }
  const handleUpdateEdit=()=>{
    if(currentEditingProduct){
      const values=getValues();
      values._id=currentEditingProduct?._id;
      values.images=selectedImages;
      mutateUpdate(values);
    }
    reset();
  }

  const handlePostProduct=(data:Product)=>{
    const dataPost:Product=({...data,images:selectedImages})
    console.log("ADDING: ", dataPost);
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

  React.useEffect(()=>{
    if(editProductMode && currentEditingProduct){
      setValue('name',currentEditingProduct?.name)
      setValue('description',currentEditingProduct?.description)
      setValue('price',currentEditingProduct?.price);
      setValue('salePrice',currentEditingProduct?.salePrice);
      setValue('stock',currentEditingProduct?.stock);
      setValue('images',currentEditingProduct?.images);
    }
  },[editProductMode,currentEditingProduct])

  return (
    <Grid container spacing={2} maxWidth="100%">
      <Grid xs={12} md={8} lg={9}>
        <Item elevation={1}>
        <form
          onSubmit={handleSubmit((data) => {
            // mutate(data);
            handlePostProduct(data);
            reset({name:"",description:"",price:"",salePrice:"",stock:""});
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
              <Button size="large" variant='outlined' fullWidth={false} onClick={() => dispatch(enableImageSelectMode(true))}><AddBoxIcon /> Add Media</Button>
            </FormGroup>

            {
              editProductMode && currentEditingProduct &&(
                <Stack flexDirection="row" gap={2} mt={2} mb={2} flexWrap="wrap" minWidth="100%">
                {currentEditingProduct.images?.map((link: Image, index:number) => (
                  <Paper key={index} elevation={1} sx={{ position:'relative' }}>
                    {/* <ImageIconControllers imageId={link?._id} /> */}
                    <img
                      id={link?._id}
                      src={`http://localhost:8080/${link.imagePath}`}
                      alt={``}
                      style={{ width: '250px', height: '250px', marginRight: '5px', marginBottom: '5px' }}
                    />
                  </Paper>
                ))}
              </Stack>
              )
            }

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
            {
            editProductMode && currentEditingProduct && (
              <Stack direction='row' gap={2}>
                <Button variant="contained" size="large" onClick={handleUpdateEdit}>Update tag</Button>
                <Button variant="contained" size="large" onClick={handleCancelEdit}>Cancel</Button>
              </Stack>
            )
          }

          {
            !editProductMode && (
              <Stack direction='row'>
                <Button variant="contained" size="large" type='submit'>
                  Add product
                </Button>
              </Stack>
            )
            
          }
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

export default D_ProductForm;