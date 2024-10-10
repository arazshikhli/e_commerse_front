import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode'
import { RootState } from '../store';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      console.log("action: ",action.payload)
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
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

export const { setAccessToken, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
