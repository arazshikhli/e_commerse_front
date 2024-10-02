import { Box } from '@mui/material'
import React from 'react'
import { ProductList } from './ProductList'
import {useGetProductsQuery}from '../../redux/rtk/productsApi';
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
  return (
    <Box sx={{width:'100%'}}>
      <ProductList allProducts={AllProducts}/>
    </Box>
  )
}
