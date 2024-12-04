import { configureStore } from '@reduxjs/toolkit';
import { productModelsApi } from './rtk/modelsApi';
import { authApi } from './rtk/authApi';
import { productApi } from './rtk/productsApi';
import tokenReducer from './baseReduxSlices/authSlice';
import cartReducer from './baseReduxSlices/cartSlice'; // Добавляем редюсеры
import wishlistReducer from './baseReduxSlices/wishlistSlice'; // Добавляем редюсеры
import { useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [productModelsApi.reducerPath]: productModelsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    token: tokenReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      productModelsApi.middleware,
      authApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

// Тип для корневого состояния
export type RootState = ReturnType<typeof store.getState>;
