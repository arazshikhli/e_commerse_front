import React, { useState,FC } from 'react';
import { Card, Grid2, Typography } from '@mui/material';
import { ProductItem } from './ProductItem';

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
    _id:string
  }
  
  type Product = IMobile | ILaptop;
  
  interface ProductsProps {
    allProducts: Product[];
  }
export const ProductList:FC<ProductsProps> = ({allProducts}) => {

    return (
        <>
            {
                allProducts?(<Grid2 container sx={{
                    gridTemplateRows:'repeat(4,1fr)',
                    width:'100%'
                }}>
                    {
                        allProducts.map((product:Product)=>{
                            return <ProductItem product ={product}/>
                        })
                    }
                </Grid2>):(<Grid2></Grid2>)
            }
        </>
    );
};
