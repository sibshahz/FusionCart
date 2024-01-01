import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Image } from '@/images/images.types';

export interface ImagesState {
    images:Image[],
    editImageMode:boolean,
    currentEditingImage: Image | {},
}

const initialState: ImagesState = {
    images:[],
    editImageMode:false,
    currentEditingImage:{},
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages: (state,action:PayloadAction<Image[]>) => {      
      state.images = action.payload;
    },
    deleteImageState: (state, action) => {
      const id = action.payload.id;
      state.images = state.images.filter((item:Image) => item._id !== id);
    },
    enableEditImageMode: (state, action) => {
      state.editImageMode=action.payload
    },
    setCurrentEditingImage: (state, action) => {
      const foundImage = state.images.find((item: Image) => item._id === action.payload);

      // If the tag is found, set currentEditingTag to the found tag, otherwise, set it to an empty object
      state.currentEditingImage = foundImage || {};
    },
    updateCurrentEditingImage: (state, action) => {
      if(state.images){
        state.images =state.images.map((item: Image) => {
          if(item._id === action.payload._id){
            item={...action.payload}
            item.imageAlt=action.payload.imageAlt
            item.imageTitle=action.payload.imageTitle
            item.imageDescription=action.payload.imageDescription
          }
          return item
        });
      }

    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setImages,
  deleteImageState,
  enableEditImageMode,
  setCurrentEditingImage,
  updateCurrentEditingImage
 } = imagesSlice.actions

export default imagesSlice.reducer