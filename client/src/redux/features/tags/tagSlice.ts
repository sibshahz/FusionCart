import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Tag} from '../../../../../common/tags/tags.types';
export interface TagsState {
    tags:[Tag] | []
}

const initialState: TagsState = {
    tags:[]
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state,action:PayloadAction<TagsState>) => {      
      state.tags =action.payload;
    },
    
    deleteTag: (state, action) => {
      const id = action.payload.id;
    
      state.tags=state.tags.filter((item:Tag) => item._id !== id);
    },    
  },
})

// Action creators are generated for each case reducer function
export const { setTags,deleteTagState } = tagsSlice.actions

export default tagsSlice.reducer