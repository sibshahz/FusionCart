import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/client/client-user/client-user';
import cartReducer from './features/client/cart/cartSlice';
import addressReducer from './features/client/address/addressSlice';

const persistConfig = {
  key: 'client-root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  address: addressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;