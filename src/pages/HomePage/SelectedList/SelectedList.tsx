import React, { FC, useEffect, useMemo, useState } from 'react'

import { IToken, IWishList, RenderedProduct } from '../../../types/types';
import { Box, Pagination, Stack } from '@mui/material';
import { ProductItem } from './ProductItem';
import {Grid} from '@mui/joy';
import {useGetWishListQuery,useGetWishListProductsQuery,useAddToWishListMutation,
  useGetCartQuery,useRemoveFromWishListMutation,
} from '@/redux/rtk/productsApi';

 import {tokenFromStore} from '@/redux/baseReduxSlices/authSlice'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
interface ListProps{
    productList:RenderedProduct[],

}
export const SelectedList:FC<ListProps> = ({productList}) => {
  const [addToWishList,{isLoading:wishListAddLoading,error:wishListAddError,isSuccess:wishListAddSuccess}]=useAddToWishListMutation();

  const accessToken=useSelector(tokenFromStore);
  let userId: string | null = null;
  if(accessToken){
    try{
        const decoded: IToken = jwtDecode<IToken>(accessToken); // Decode the token correctly
        userId = decoded.id; // Check if the user is an admin
    }
    catch(err){
        console.error('Error decoding token:', err);
    }
}
console.log("Parent render");

const {data:wishList,isLoading:isWishListLoading,error:wishListError}=useGetWishListQuery(userId||'',{skip:!userId});
const {data:cartData }=useGetCartQuery(userId||'',{skip:!userId});
const [removeFromWishList,{error:removeWishError,isSuccess:isRemoveWishSuccess}]=useRemoveFromWishListMutation();
const memoizedProductList = useMemo(() => productList, [productList]);
const memoizedWishList=useMemo(()=>wishList,[userId,wishList]);
console.log("parrent,",wishList);
console.log("memoized",memoizedWishList);
  return (
    <Box sx={{padding:2,width:'100%'}}>
<Grid
  container
  spacing={{ xs: 2, md: 3 }}
  columns={{ xs: 4, sm: 8, md: 16 }}
  sx={{ flexGrow: 1 }}
>
        {
          productList&&productList.map((product:RenderedProduct)=>
            <Grid key={product._id} xs={2} sm={4} md={4}>
                 <ProductItem userId={userId}
            cartData={cartData}
           addToWishList={addToWishList}
           removeFromWishList={removeFromWishList}
           removeWishError={removeWishError}
           isRemoveWishSuccess={isRemoveWishSuccess}
            wishList={wishList}
             key={product._id} item={product}/>
            </Grid>
          
          )
        }
      </Grid> 
    </Box>
  )
}
