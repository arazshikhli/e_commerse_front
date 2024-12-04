import React, {
  useState,
  useCallback,
  memo,
  Dispatch,
  SyntheticEvent,
  FC,
  useEffect,
} from 'react';
import { Box, List, ListItem, Typography, Drawer } from '@mui/material';
import { HeaderComponent } from './Header';
import { Outlet } from 'react-router-dom';
import { useGetProductModelsNamesQuery } from '../../redux/rtk/modelsApi';
import './style.css';
import {
  useGetCartProductsQuery,
  useGetCartQuery,
  useGetWishListProductsQuery,
  useGetWishListQuery,
} from '../../redux/rtk/productsApi';
import { useSelector } from 'react-redux';
import {} from '../../redux/baseReduxSlices/authSlice';
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';
import { Snackbar, Alert } from '@mui/material';
interface modelName {
  categoryName: string;
}
interface LayoutProps {
  openSnackBar: boolean;
  setOpenSnackBar: Dispatch<React.SetStateAction<boolean>>;
  handleClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

export const Layout: FC<LayoutProps> = memo(
  ({ openSnackBar, setOpenSnackBar, handleClose }) => {
    const accessToken = useSelector(
      (state: RootState) => state.token.accessToken
    );

    let userId: string | null = null;
    if (accessToken) {
      try {
        const decoded: any = jwtDecode(accessToken);
        userId = decoded?.id; // получаем id пользователя
      } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        userId = null; // Если токен некорректен
      }
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <HeaderComponent />
        <Box
          sx={{
            width: '100%',
            overflowX: 'hidden',
            padding: '10px 10px 0 10px',
            backgroundColor: '#F3F3F3',
          }}
        >
          <Outlet />
          <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Auth Successful!
            </Alert>
          </Snackbar>
        </Box>
        <Box
          component="footer"
          sx={{
            backgroundColor: '#DD38C6',
            padding: '20px',
            textAlign: 'center',
            mt: 'auto',
          }}
        >
          Footer
        </Box>
      </Box>
    );
  }
);
