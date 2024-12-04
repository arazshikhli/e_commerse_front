import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartProducts, ICartQuery } from '../../types/types';
import { productApi } from '../rtk/productsApi';

// Асинхронный thunk для получения данных корзины с сервера
export const fetchCart = createAsyncThunk<CartProducts[], string>(
  'cart/fetchCart',
  async (userId, { dispatch }) => {
    const { data } = await dispatch(
      productApi.endpoints.getCartProducts.initiate(userId)
    );
    return data as CartProducts[]; // Приведение к нужному типу
  }
);

interface CartState {
  items: CartProducts[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      });
  },
});

export const { clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => {
  console.log('state.cart', state.cart.items);
  return state.cart.items;
};
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
