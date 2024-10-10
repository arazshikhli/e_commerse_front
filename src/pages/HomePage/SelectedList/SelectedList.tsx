import React, { FC, useState } from 'react'
import {useGetProductsQuery} from '../../../redux/rtk/productsApi';
import { RenderedProduct } from '../../../types/types';
import { Box, Pagination, Stack } from '@mui/material';
import { ProductItem } from './ProductItem';
import Grid from '@mui/joy/Grid';

interface ListProps{
    productList:RenderedProduct[],

}
export const SelectedList:FC<ListProps> = ({productList}) => {

  return (
    <Box sx={{padding:2,width:'100%'}}>
      <Grid container spacing={6}>
        {
          productList&&productList.map((product:RenderedProduct)=>{
            return <ProductItem key={product._id} item={product}/>
          })
        }
      </Grid> 
    </Box>
  )
}
