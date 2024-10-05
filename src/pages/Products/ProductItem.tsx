import React, { FC, useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid2, IconButton, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { CommonType } from '../../types/product.interfaces';

interface ProductProps {
  product: CommonType;
}

export const ProductItem: FC<ProductProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (

      
        <Card
        sx={{
          marginRight:'2px',
          height:'400px',
          borderRadius:'15px'
        }}
        >
          <CardHeader title={product.model} />
   
          <CardContent>
            {/* Add content here */}
          </CardContent>
          <CardActions
            sx={{
              justifyContent: 'space-between',
              transition: 'opacity 0.3s',
              opacity: hovered ? 1 : 0,
              visibility: hovered ? 'visible' : 'hidden',
            }}
          >
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton>
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
          </CardActions>
        </Card>
   
  );
};
