import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AddressState {
  shippingCity: String,
  shippingState: String,
  shippingCountry: String,
  shippingPostalCode: String,
}

const initialState: AddressState = {
    shippingCity:'',
    shippingCountry:'',
    shippingPostalCode:'',
    shippingState:'',
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state,action:PayloadAction<AddressState>) => {
      const {
        shippingCity,
        shippingState,
        shippingCountry,
        shippingPostalCode,
      } = action.payload;
      
      state.shippingCity = shippingCity ?? '';
      state.shippingState = shippingState ?? '';
      state.shippingCountry = shippingCountry ?? '';
      state.shippingPostalCode = shippingPostalCode ?? '';
    },
    resetAddress: (state) => {
      state.shippingCity = '';
      state.shippingState = '';
      state.shippingCountry = '';
      state.shippingPostalCode = '';
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAddress,resetAddress } = addressSlice.actions

export default addressSlice.reducer