import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Tag} from '@/tags/tags.types';

export interface TagsState {
    tags:[Tag] | [],
    editTagMode:boolean,
    currentEditingTag?: Tag | {},
}

const initialState: TagsState = {
    tags:[],
    editTagMode:false,
    currentEditingTag:{},
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state,action:PayloadAction<TagsState>) => {      
      state.tags =action.payload;
    },
    deleteTagState: (state, action) => {
      const id = action.payload.id;
      state.tags=state.tags.filter((item:Tag) => item._id !== id);
    },
    enableEditTagMode: (state, action) => {
      state.editTagMode=action.payload
    },
    setCurrentEditingTag: (state, action) => {
      const foundTag = state.tags.find((item: Tag) => item._id === action.payload);

      // If the tag is found, set currentEditingTag to the found tag, otherwise, set it to an empty object
      state.currentEditingTag = foundTag || {};
    },
    updateCurrentEditingTag: (state, action) => {
      if(state.tags){

        state.tags =state.tags.map((item: Tag) => {
          if(item._id === action.payload._id){
            // item={...action.payload}
            item.tagName=action.payload.tagName
            item.tagSlug=action.payload.tagSlug
            item.tagDescription=action.payload.tagDescription
          }
          return item
        });
      }

    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setTags,
  deleteTagState,
  enableEditTagMode,
  setCurrentEditingTag,
  updateCurrentEditingTag
 } = tagsSlice.actions

export default tagsSlice.reducer