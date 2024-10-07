import React, { FC } from 'react';
import { CommonType } from '../../types/types';
import { Box } from '@mui/material';
import { ProductItem } from '../Products/ProductItem';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 const settings = {
  dots: true,
  infinite: true,  // поставьте true для тестирования
  speed: 500,
  slidesToShow: 3,  // уменьшите количество для теста
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


interface ProductProps {
  products: CommonType[];
  type: string;
}
export const ProductSlider: FC<ProductProps> = ({ products, type }) => {
  return (
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
  );
};
