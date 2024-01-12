'use client'
import React from 'react'
import CartTable from './cart-table.component'
import LayoutContainer from '../layout-container/layout-container.component'
import CartSummary from './cart-summary.component'

type Props = {}

const CartComponent =(props: Props) => {
  return (
    <div>
    <LayoutContainer bg='inherit'>
      {/* <div className="grid grid-cols-6 gap-8 overflow-hidden"> */}
      <div className="flex flex-row flex-wrap gap-8 justify-between">
      <div className="basis-2/3">
        <CartTable />
        </div>
        <div className="basis-1/4">
        <CartSummary />
        </div>
      </div>
    </LayoutContainer>
    </div>
  )
}

export default CartComponent