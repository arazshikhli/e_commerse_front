import React from 'react'
import { Box,Card,CardContent,CardMedia } from '@mui/material';


interface LaptopItemProps {
    brand: string;
    model: string;
    price: number;
    description: string;
    stock: number;
    image: string;
    productDetails: {
      screenSize: string;
      ram: string;
      processor: string;
      storage: string;
    };
  }


  export const LaptopItem: React.FC<LaptopItemProps> = ({
    brand,
    model,
    price,
    description,
    stock,
    image,
    productDetails,
  }) => {
    return (
      <Card>
        <CardMedia component="img" image={image} alt={model} />
        <Box>
          <h2>{brand} - {model}</h2>
          <p>{description}</p>
          <p>Price: {price}</p>
          <p>Stock: {stock}</p>
          <p>Details: {productDetails.screenSize}, {productDetails.ram}, {productDetails.processor}, {productDetails.storage}</p>
        </Box>
      </Card>
    );
  };