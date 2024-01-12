import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CartProduct} from "@/cart/cart.types";

export interface CartState {
    cartProducts:CartProduct[],
    subTotal:number;
}

const initialState: CartState = {
    cartProducts:[],
    subTotal: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state,action:PayloadAction<CartProduct[]>) => {      
      state.cartProducts=action.payload;
      state.subTotal = calculateSubTotal(state.cartProducts);
    },
    addToCart: (state,action:PayloadAction<CartProduct>) => {      
      state.cartProducts.push(action.payload);
      state.subTotal = calculateSubTotal(state.cartProducts);
    },
    deleteFromCart: (state, action) => {
      const id = action.payload;
      state.cartProducts = state.cartProducts.filter((item:CartProduct) => item._id !== id);
      state.subTotal = calculateSubTotal(state.cartProducts);
    },
    resetCart: (state) => {
      state.cartProducts=[]
      state.subTotal=0;
    },
    updateCartItemQuantity: (state,action) => {
      state.cartProducts.map((item) => {
        if(item._id === action.payload._id){
          return {...item, quantity: item.quantity+action.payload};
        }
      })
      state.subTotal = calculateSubTotal(state.cartProducts);
    },
  },
})

const calculateSubTotal = (cartProducts: CartProduct[]): number => {
  return cartProducts.reduce((total, cartItem) => total + cartItem?.product?.salePrice, 0);
};

// Action creators are generated for each case reducer function
export const { 
  setCartData,
  addToCart,
  deleteFromCart,
  resetCart,
  updateCartItemQuantity,  
} = cartSlice.actions

export default cartSlice.reducer