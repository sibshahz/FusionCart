import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CartProduct} from "@/cart/cart.types";

export interface CartState {
    cartProducts:CartProduct[],
}

const initialState: CartState = {
    cartProducts:[],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action:PayloadAction<CartProduct>) => {      
      state.cartProducts.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      const id = action.payload;
      console.log("ITEM TO DELETE: ", action.payload)
      state.cartProducts = state.cartProducts.filter((item:CartProduct) => item.product._id !== id);
    },
    resetCart: (state) => {
      state.cartProducts=[]
    },
    updateCartItemQuantity: (state,action) => {
      state.cartProducts.map((item) => {
        if(item._id === action.payload._id){
          return {...item, quantity: item.quantity+action.payload};
        }
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  addToCart,
  deleteFromCart,
  resetCart,
  updateCartItemQuantity,  
} = cartSlice.actions

export default cartSlice.reducer