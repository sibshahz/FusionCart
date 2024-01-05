import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Image } from '@/images/images.types';

export interface ImagesState {
    images:Image[],
    filteredImages:Image[],
    filteredImagesId:string[],
    editImageMode:boolean,
    currentEditingImage: Image | {},
    imageSelectMode:boolean,
    selectedImagesId:string[],
    selectedImages:string[]
}

const initialState: ImagesState = {
    images:[],
    filteredImages:[],
    filteredImagesId:[],
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
    setFilteredImages: (state) => {
      // state.filteredImages=state.images?.filter(item => state.selectedImages.includes(item?._id))
      state.filteredImages = state.images?.filter(item => state.selectedImagesId.includes(item?._id)) || [];
    },
    removeFromFilteredImages:(state,action:PayloadAction<string>)=>{
      state.filteredImages = state.filteredImages?.filter(item => item?._id !== action.payload)
    },
    resetFilteredImages: (state) => {
      state.filteredImages=[]
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
      }
    },

    resetAddSelectedImageId: (state) => {
      state.selectedImagesId = [];
    },
    addSelectedImagesId: (state,action: PayloadAction<Image[]>) => {
      state.selectedImagesId=action.payload.map(item => {
        return item._id
      })
    },
    resetSelectedImages: (state) => {
      state.selectedImages=[]
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setImages,
  setFilteredImages,
  resetFilteredImages,
  removeFromFilteredImages,
  enableImageSelectMode,
  deleteImageState,
  enableEditImageMode,
  setCurrentEditingImage,
  updateCurrentEditingImage,
  toggleAddSelectedImageId,
  resetAddSelectedImageId,
  resetSelectedImages,
  addSelectedImagesId,
 } = imagesSlice.actions

export default imagesSlice.reducer