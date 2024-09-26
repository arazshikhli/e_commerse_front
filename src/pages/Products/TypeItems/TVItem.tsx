import React from 'react';
import { Box,Card,CardContent,CardMedia } from '@mui/material';

interface TVItemProps {
    brand: string;
    model: string;
    price: number;
    description: string;
    stock: number;
    image: string;
    productDetails: {
      screenSize: string;
      resolution: string;
      smartTV: boolean;
    };
  }
  
  export const TVItem: React.FC<TVItemProps> = ({
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
          <p>Details: {productDetails.screenSize}, {productDetails.resolution}, Smart TV: {productDetails.smartTV ? 'Yes' : 'No'}</p>
        </Box>
      </Card>
    );
  };