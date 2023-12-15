"use client"
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FormGroup, TextField,Stack, Button, FormHelperText} from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"

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
  productName: string
  productDescription: string
}
function D_ProductForm({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   console.log('Data is: ', data)
  //   abort();

  // }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8} lg={9}>
        <Item elevation={1}>
        <form 
          onSubmit={handleSubmit((data) => {
          console.table(data);
          })} >
          <Stack direction="column" rowGap={6}>
            <FormGroup>
              <TextField 
                id="product-name" 
                label="Product Name" 
                variant="outlined" 
                autoComplete="false" 
                {...register("productName", {required: true})}
              />
              {errors.productName && <FormHelperText error filled>Product name is required</FormHelperText>}
            </FormGroup>
            
            <FormGroup>
              <TextField 
                label="Product Description"
                multiline
                rows={12}
                variant="outlined"
                {...register("productDescription", { required: true })}
              />
              {errors.productDescription && <FormHelperText error filled>Description of product is required</FormHelperText>}
            </FormGroup>

            <Button variant="contained" size="large" type='submit'>
              Publish
            </Button>
          </Stack>

        </form>
        </Item>
      </Grid>
      <Grid xs={12} md={4} lg={3}>
        <Item>xs=4</Item>
      </Grid>
    </Grid>
  )
}

export default D_ProductForm;