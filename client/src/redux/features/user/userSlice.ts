import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    _id?:string,
    firstName?:string,
    profilePic?:string,
    lastName?:string,
    email?:string,
    userType?:string,
    isLoggedIn?:boolean
  
}

const initialState: UserState = {
    _id:'123',
    firstName:'jh',
    profilePic:'',
    lastName:'',
    email:'',
    userType:'',
    isLoggedIn:false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action:PayloadAction<UserState>) => {
      const {
        _id,
        firstName,
        profilePic,
        lastName,
        email,
        userType,
        isLoggedIn,
      } = action.payload;
      
      state._id = _id ?? '';
      state.firstName = firstName ?? '';
      state.profilePic = profilePic ?? '';
      state.lastName = lastName ?? '';
      state.email = email ?? '';
      state.userType = userType ?? '';
      state.isLoggedIn = isLoggedIn ?? false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer