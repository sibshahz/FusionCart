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
import { enableAddProductMode, enableEditProductMode, setCurrentEditingProduct, toggleProductEditDialog, updateCurrentEditingProduct } from '@/src/redux/features/products/productSlice';
import CustomizedSnackbars from '../snackbar/snackbar.component';
import { RootState } from '@/src/redux/store';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { addSelectedImagesId, enableImageSelectMode, removeFromFilteredImages, resetAddSelectedImageId, resetFilteredImages, resetSelectedImages, setFilteredImages, toggleAddSelectedImageId } from '@/src/redux/features/images/imageSlice';
import ImageSelectorDialog from '../gallery/image-selector-dialog.component';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


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
  tagline:string,
}
function D_ProductEditForm({}: Props) {
  
  const dispatch=useDispatch();
  const currentEditingProduct = useSelector((state:RootState) => state.products.currentEditingProduct)
  const selectedImagesId = useSelector((state:RootState) => state.images.selectedImagesId)
  const filteredImages=useSelector((state:RootState) => state.images.filteredImages)

  const queryClient = useQueryClient();

  const { mutate:mutateUpdate, isLoading:updateLoading } = useMutation(updateProduct, {
    onSuccess: data => {
    dispatch(updateCurrentEditingProduct(data));
    dispatch(setCurrentEditingProduct({}))
    dispatch(toggleProductEditDialog())
    dispatch(resetFilteredImages());
    dispatch(resetAddSelectedImageId());
    reset({ name: '',description:'',price:'',salePrice:'',stock:'',images:[],tagline:'' })
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
    reset({ name:'',description:'',price:'',salePrice:'',stock:'',images:[],tagline:'' })
    dispatch(setCurrentEditingProduct({}))
    dispatch(toggleProductEditDialog())
    dispatch(resetAddSelectedImageId());
    dispatch(resetFilteredImages())
    dispatch(setSnackbar({message:"Edit cancelled", severity:"info",snackbarOpen:true}))
  }
  const handleUpdateEdit=()=>{
    const values=getValues();
    values._id=currentEditingProduct?._id;
    values.images=selectedImagesId;
    mutateUpdate(values);
    reset();
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
    dispatch(addSelectedImagesId(currentEditingProduct?.images))
    setValue('name',currentEditingProduct?.name)
    setValue('description',currentEditingProduct?.description)
    setValue('price',currentEditingProduct?.price);
    setValue('salePrice',currentEditingProduct?.salePrice);
    setValue('stock',currentEditingProduct?.stock);
    setValue('images',currentEditingProduct?.images);
    setValue('tagline',currentEditingProduct?.tagline);
    dispatch(setFilteredImages())
  },[])

  return (
    <Grid container spacing={2} maxWidth="100%">
      <Grid xs={12} md={8} lg={9}>
        <Item elevation={1}>
        <form
          onSubmit={handleSubmit((data) => {
            // mutate(data);
            handleUpdateEdit(data);
            reset({name:"",description:"",price:"",salePrice:"",stock:"",images:[]});
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
                label="Product Tagline"
                multiline
                rows={8}
                variant="outlined"
                value={watch("tagline")}
                {...register("tagline", { required: false })}
              />
            </FormGroup>

            <FormGroup>
              <Button size="large" variant='outlined' fullWidth={false} onClick={() => dispatch(enableImageSelectMode(true))}><AddBoxIcon /> Add Media</Button>
            </FormGroup>

            <Stack flexDirection="row" gap={2} mt={2} mb={2} flexWrap="wrap" minWidth="100%">
            {filteredImages?.map((link: Image, index:number) => (
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
              <Stack direction='row' gap={2}>
                <Button variant="contained" size="large" onClick={handleUpdateEdit}>Update Product</Button>
                <Button variant="contained" size="large" onClick={handleCancelEdit}>Cancel</Button>
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

export default D_ProductEditForm;