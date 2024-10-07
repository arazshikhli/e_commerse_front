import { Alert, Box, Card, CardHeader, Skeleton, Typography,Grid2 } from '@mui/material'
import React from 'react';
import {useGetProductsQuery} from '../../../redux/rtk/productsApi'
import { log } from 'console';
import { CommonType } from '../../../types/types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

 const settings = {
  dots: true,
  infinite: true,  // поставьте true для тестирования
  speed: 500,
  slidesToShow: 5,  // уменьшите количество для теста
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


export const AllProducts = () => {
  const {data:Products,error,isLoading}=useGetProductsQuery('')
  console.log(Products);
  
  if(isLoading) return <Skeleton/>
  if(error) return <Alert variant='filled'/>
  return (
    <Box sx={{
      width:'100%',
      height:'100%',
      overflow:'hidden'
    }}>
       <Slider {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>


    </Box>
  )
}
