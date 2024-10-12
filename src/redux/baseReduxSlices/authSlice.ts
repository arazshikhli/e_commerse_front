import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode'
import { RootState } from '../store';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: null, // Если refreshToken хранится в cookies, не нужно хранить его здесь
  user: localStorage.getItem('accessToken')
    ? jwtDecode(localStorage.getItem('accessToken')!) // Декодируем токен при инициализации
    : null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      console.log('action: ', action.payload);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken; // Хранится в состоянии, но не в localStorage

      // Декодируем и сохраняем информацию о пользователе
      state.user = jwtDecode(accessToken);

      // Сохраняем только accessToken в localStorage
      localStorage.setItem('accessToken', accessToken);
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const tokenFromStore=(state:RootState)=>state.token.accessToken;

export const decodeToken = (token: string | null) => {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Token decoding error:', error);
    return null;
  }
};

export const {  setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
