import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/user/userSlice';
import productsReducer from './features/products/productSlice'
import tagsReducer from '@/src/redux/features/tags/tagSlice'
import snackReducer from "@/src/redux/features/snackbar/snackbar"
// import productReducer from './features/product/productSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  products:productsReducer,
  tags: tagsReducer,
  snackbar:snackReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;