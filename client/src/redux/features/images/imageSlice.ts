import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Image } from '@/images/images.types';

export interface ImagesState {
    images:Image[],
    editImageMode:boolean,
    currentEditingImage: Image | {},
    imageSelectMode:boolean,
    selectedImagesId:string[],
    selectedImages:string[]
}

const initialState: ImagesState = {
    images:[],
    editImageMode:false,
    currentEditingImage:{},
    imageSelectMode:false,
    selectedImagesId:[],
    selectedImages:[],
}

export const imagesSlice = createSlice({
  name: 'state-images',
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
    enableImageSelectMode: (state,action) => {
      state.imageSelectMode=action.payload
    },
    toggleAddSelectedImageId: (state, action: PayloadAction<string>) => {
      const index = state.selectedImagesId.indexOf(action.payload);
      if (index !== -1) {
        state.selectedImagesId=state.selectedImagesId.filter((item) => item !== action.payload)
      } else {
        state.selectedImagesId.push(action.payload)
        console.log("TABLE: ",state.selectedImagesId)
      }
    },

    resetAddSelectedImageId: (state, action: PayloadAction<string[]>) => {
      state.selectedImagesId = [];
    },
    addSelectedImages: (state) => {
      state.selectedImages=state.selectedImagesId
    },
    resetSelectedImages: (state) => {
      state.selectedImages=[]
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setImages,
  enableImageSelectMode,
  deleteImageState,
  enableEditImageMode,
  setCurrentEditingImage,
  updateCurrentEditingImage,
  toggleAddSelectedImageId,
  resetAddSelectedImageId,
  resetSelectedImages,
  addSelectedImages,
 } = imagesSlice.actions

export default imagesSlice.reducer