import React, { useState,FC } from 'react';
import { Card, Grid2, Typography } from '@mui/material';
import { ProductItem } from './ProductItem';
import { CommonType } from '../../types/product.interfaces';
  interface ProductsProps {
    TVList: CommonType[];
    MobileList: CommonType[];
    LaptopList:CommonType[]
  }


export const ProductList:FC<ProductsProps> = ({LaptopList,MobileList,TVList}) => {

  console.log(TVList);
    return (
     <Grid2 container spacing={{xs:2,md:3}} columns={{xs: 4, sm: 8, md: 12}}>
      {/* {
        TVList.map((product:CommonType)=>{
          console.log(product);
          
          return <ProductItem product={product}/>
        })
      } */}
     </Grid2>
    );
};
