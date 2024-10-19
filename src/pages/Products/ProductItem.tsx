import React, { FC, useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid2, IconButton, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { CommonType, RenderedProduct } from '@/types/types';
interface ProductProps {
  product: RenderedProduct;
  onCardClick: (product: RenderedProduct) => void; 
}

export const ProductItem: FC<ProductProps> = ({ product,onCardClick }) => {
 
  const [hovered, setHovered] = useState(false);

  const handleClick=()=>{
    onCardClick(product)
  }


  return (

      
         <Card
         onClick={handleClick} 
        sx={{
          marginRight:'5px',
          height:'300px',
          borderRadius:'15px',
          cursor:'pointer'
          
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
              // opacity: hovered ? 1 : 0,
              // visibility: hovered ? 'visible' : 'hidden',
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
