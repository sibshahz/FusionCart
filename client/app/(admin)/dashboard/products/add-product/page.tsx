"use client"
import D_ProductForm from '@/src/components/admin/product/d_product-form.component'
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'
import { Typography,Box } from '@mui/material'
import React from 'react'

type Props = {}

const AddProductsPage = (props: Props) => {
  return (
    <>
      <LayoutContainer
        bg={'#f0f0f1'}
      >
          <Typography
            fontSize={24}
            mb={2}
          >Add Product</Typography>
          <D_ProductForm />
      </LayoutContainer>
    </>
  )
}

export default AddProductsPage