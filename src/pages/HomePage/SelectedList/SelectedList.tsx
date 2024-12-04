import React, { FC, useEffect, useMemo, useState } from 'react';

import { IToken, IWishList, RenderedProduct } from '../../../types/types';
import { Box, Pagination, Stack } from '@mui/material';
import { ProductItem } from './ProductItem';
import { Grid } from '@mui/joy';
import {
  useGetWishListQuery,
  useGetCartQuery,
  useRemoveFromWishListMutation,
} from '../../../redux/rtk/productsApi';

import { tokenFromStore } from '../../../redux/baseReduxSlices/authSlice';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
interface ListProps {
  productList: RenderedProduct[];
}
export const SelectedList: FC<ListProps> = ({ productList }) => {
  const accessToken = useSelector(tokenFromStore);
  let userId: string | null = null;
  if (accessToken) {
    try {
      const decoded: IToken = jwtDecode<IToken>(accessToken);
      userId = decoded.id;
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  }

 const { data: cartData } = useGetCartQuery(userId || '', { skip: !userId });

 const memoizedCart = useMemo(() => {
  return cartData;
}, [cartData, userId]);
  console.log('list render')

  return (
    <Box sx={{ padding: 2, width: '100%' }}>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
        {productList &&
          productList.map((product: RenderedProduct) => (
            <Grid key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductItem
                userId={userId}
                cartData={memoizedCart}
                key={product._id}
                item={product}
              />
            </Grid>
          ))}
      </Grid>
      <ToastContainer />
    </Box>
  );
};
