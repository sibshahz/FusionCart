import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from "@/product/product.types";

export interface ProductsState {
    products:Product[],
    editProductMode:boolean,
    currentEditingProduct?: Product | {},
}

const initialState: ProductsState = {
    products:[],
    editProductMode:false,
    currentEditingProduct:{},
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state,action:PayloadAction<Product[]>) => {      
      state.products = action.payload;
    },
    deleteProductState: (state, action) => {
      const id = action.payload.id;
      state.products = state.products.filter((item:Product) => item._id !== id);
    },
    enableEditProductMode: (state, action) => {
      state.editProductMode=action.payload
    },
    setCurrentEditingProduct: (state, action) => {
      const foundProduct = state.products.find((item: Product) => item._id === action.payload);

      // If the tag is found, set currentEditingTag to the found tag, otherwise, set it to an empty object
      state.currentEditingProduct = foundProduct || {};
    },
    updateCurrentEditingProduct: (state, action) => {
      if(state.products){

        state.products =state.products.map((item: Product) => {
          if(item._id === action.payload._id){
            // item={...action.payload}
            // item.tagName=action.payload.tagName
            // item.tagSlug=action.payload.tagSlug
            // item.tagDescription=action.payload.tagDescription
          }
          return item
        });
      }

    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setProducts,
  deleteProductState,
  enableEditProductMode,
  setCurrentEditingProduct,
  updateCurrentEditingProduct
 } = productsSlice.actions

export default productsSlice.reducer