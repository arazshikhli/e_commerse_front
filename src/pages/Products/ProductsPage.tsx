import { Box,CircularProgress,Typography } from '@mui/material'
import React from 'react'
import { ProductList } from './ProductList'
import {useGetProductsQuery}from '../../redux/rtk/productsApi';
import { CommonType } from '../../types/types';
interface IMobile {
  brand: string;
  model: string;
  price: number;
  description: string;
  screenSize: string;
  ram: string;
  processor: string;
  storage: string;
  imageURL: string;
  stock?: number;
  categoryName:string,
  _id:string
}

interface ILaptop {
  brand: string;
  model: string;
  price: number;
  description: string;
  screenSize: string;
  ram: string;
  processor: string;
  storage: string;
  graphicsCard: string;
  imageURL: string;
  stock?: number;
  categoryName?:string
  comments?:[],
  _id:string,
}

type Product = IMobile | ILaptop;

interface ProductProps {
  product: Product;
}
export const ProductsPage = () => {
  const {data:AllProducts,error,isLoading}=useGetProductsQuery('');


  const TVList: CommonType[] = [];
  const MobileList: CommonType[] = [];
  const LaptopList: CommonType[] = [];

  // Однократная фильтрация для создания списков
  AllProducts.forEach((item: CommonType) => {
    if (item.categoryName === 'TV') {
      TVList.push(item);
    } else if (item.categoryName === 'Mobile') {
      MobileList.push(item);
    } else if (item.categoryName === 'Laptop') {
      LaptopList.push(item);
    }
  });
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Error: </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{width:'100%'}}>
      <ProductList TVList={TVList} MobileList={MobileList} LaptopList={LaptopList}/>
    </Box>
  )
}
