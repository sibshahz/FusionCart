import D_ProductTable from '@/src/components/admin/product/d_product-table.component'
import { Grid } from '@mui/material'
import React from 'react'

type Props = {}

const ProductsPage = (props: Props) => {
  return (
    <Grid container spacing={2} mt={5} >
      <Grid xs={12} sx={{ 
        marginLeft:2
       }}>
        <D_ProductTable />
      </Grid>
  </Grid>
  )
}

export default ProductsPage