'use client'
import React from 'react'
import CartTable from './cart-table.component'
import LayoutContainer from '../layout-container/layout-container.component'

type Props = {}

const CartComponent =(props: Props) => {
  return (
    <div>
    <LayoutContainer bg='inherit'>
    <CartTable />
    </LayoutContainer>
    </div>
  )
}

export default CartComponent