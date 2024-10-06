import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { ProductsPage } from '../Products/ProductsPage';
import { CommonType,RenderedProduct} from '../../types/product.interfaces';
import {useGetAllUsersQuery} from '../../redux/rtk/authApi';
import {useGetProductsQuery} from '../../redux/rtk/productsApi'
import { ProductSlider } from './ProductSlider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { ProductItem } from '../Products/ProductItem';
import {useNavigate} from 'react-router-dom';

const settings = {
  dots: true,
  dotsClass: "slick-dots slick-thumb",
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
  draggable:true,
  gap:2,
  autoplaySpeed:3000,
  arrows:true,
  autoplay:true,
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
interface User {
  _id: string;
  password: string;
  name: string;
  email: string;
  cart: CommonType[];
}

export const HomePage = () => {
  const { data: allUsersData = [], isLoading, error } = useGetAllUsersQuery('');
  const {data:aAllProducts,isLoading:isProductsLoading,error:productsError}=useGetProductsQuery('')
  const allUsers = Array.isArray(allUsersData) ? allUsersData : allUsersData.users || [];
  const navigate=useNavigate()
  const TVList: RenderedProduct[] = [];
  const MobileList: RenderedProduct[] = [];
  const LaptopList: RenderedProduct[] = [];

  aAllProducts?.forEach((item: RenderedProduct) => {
    if (item.categoryName === 'TV') {
      TVList.push(item);
    } else if (item.categoryName === 'Mobile') {
      MobileList.push(item);
    } else if (item.categoryName === 'Laptop') {
      LaptopList.push(item);
    }
  });

  const CardClick=(product:RenderedProduct)=>{
    console.log(product.model);
    navigate(`products/detail/${product._id}`)
  }
  if (isProductsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (productsError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Typography variant="h6">Error: </Typography>
      </Box>
    );
  }
  return (  <Box
                   sx={{
                  display: 'flex',
                  width: '100%',  // Убедитесь, что ширина контейнера фиксирована
                  flexDirection: 'row',
                  marginTop: '60px',
                }}
           
              >
                <Box flex={1}></Box>
  <Box flex={5} sx={{overflow:'hidden'}}>
    <Box>
    <Slider  {...settings}>
     {
      TVList&& TVList.map((item:RenderedProduct)=>{
        return <ProductItem product={item} onCardClick={CardClick}/>
      })
     }
    </Slider>
    </Box>

  </Box>
  <Box flex={1}>

  </Box>
  </Box>

  );
};