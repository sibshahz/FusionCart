import { AlertColor } from '@mui/material/Alert';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SnackState {
    message:string,
    severity:AlertColor | undefined,
    snackbarOpen:boolean,
  
}

const initialState: SnackState = {
    message:'',
    severity:undefined,
    snackbarOpen:false,
}

export const snackSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state,action:PayloadAction<SnackState>) => {
      const {
        message,
        severity,
        snackbarOpen,
      } = action.payload;
      
      state.message = message ?? '';
      state.severity = severity ?? undefined;
      state.snackbarOpen = snackbarOpen ?? false;
    },
    resetSnackbar: (state) => {
      state.snackbarOpen = false;
      state.message = '';
      state.severity = undefined;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSnackbar,resetSnackbar } = snackSlice.actions

export default snackSlice.reducer