import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CartProduct} from "@/cart/cart.types";

export interface CartState {
    cartProducts:CartProduct[],
    cartCount:number;
    subTotal:number;
}

const initialState: CartState = {
  cartProducts: [],
  cartCount: 0, 
  subTotal: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state,action:PayloadAction<CartProduct[]>) => {      
      state.cartProducts=action.payload;
      state.subTotal = calculateSubTotal(state.cartProducts);
      state.cartCount = state.cartProducts.length;
    },
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingCartItemIndex = state.cartProducts.findIndex(
        item => item.product._id === action.payload.product._id
      );
    
      if (existingCartItemIndex !== -1) {
        // If the product is already in the cart, update quantity and subtotal
        state.cartProducts = state.cartProducts.map((item, index) => {
          if (index === existingCartItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
              subTotal: (item.quantity + 1) * item?.product?.salePrice
            };
          }
          return item;
        });
      } else {
        // If the product is not in the cart, add it
        state.cartProducts.push({
          ...action.payload,
          quantity: 1,
          subTotal: action.payload.product?.salePrice,
        });
      }
    
      state.subTotal = calculateSubTotal(state.cartProducts);
      state.cartCount = state.cartProducts.length;
    },
    
    deleteFromCart: (state, action) => {
      const id = action.payload;
      state.cartProducts = state.cartProducts.filter((item:CartProduct) => item._id !== id);
      state.subTotal = calculateSubTotal(state.cartProducts);
      state.cartCount = state.cartProducts.length;
    },
    resetCart: (state) => {
      state.cartProducts=[]
      state.subTotal=0;
      state.cartCount = state.cartProducts.length;
    },
    updateCartItemQuantity: (state, action) => {
      state.cartProducts = state.cartProducts.map(item => {
        if (item._id === action.payload._id) {
          const quantity = parseInt(action.payload.quantity);
          const subTotal = quantity * (item?.product?.salePrice || 0);
          return {
            ...item,
            quantity,
            subTotal,
          };
        }
        return item;
      });
    
      state.subTotal = calculateSubTotal(state.cartProducts);
      state.cartCount = state.cartProducts.length;
    },
  },
})

const calculateSubTotal = (cartProducts: CartProduct[]): number => {
  return cartProducts.reduce((total, cartItem) => total + cartItem?.product?.salePrice*cartItem.quantity, 0);
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