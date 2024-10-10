import React, { FC } from 'react'
import { RenderedProduct } from '../../../types/types'
 import Card from '@mui/joy/Card';
 import AspectRatio from '@mui/joy/AspectRatio';
 import CardContent from '@mui/joy/CardContent';
 import CardOverflow from '@mui/joy/CardOverflow';
 import Divider from '@mui/joy/Divider';
 import Typography from '@mui/joy/Typography';
 import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

interface ProductItemProps{
    item:RenderedProduct
}
export const ProductItem:FC<ProductItemProps> = ({item}) => {
  const navigate=useNavigate()
    
  const handleNavigate=(id:string)=>{
    navigate(`/products/detail/${id}`)
  }
  return (
    <Card sx={{width:320,cursor:'pointer'}} variant='outlined' onClick={()=>{if(item._id){handleNavigate(item._id)}}}>
      <CardOverflow>
        <AspectRatio ratio={'2'}>
            <img src={item.imageURL[0]}
            srcSet={item.imageURL[0]}
            loading='lazy'
            style={{
              objectFit: 'contain', 
              objectPosition: 'center', 
              width: '100%',
              height: '100%',
          }}
            />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{display:'flex',flexDirection:'column'}}>
    <Box>
    <Typography level='title-md'>{item.model}</Typography>
    <Typography level='body-sm'>{item.brand}</Typography>
    </Box>
    <Box sx={{width:'100%',display:'flex',flexDirection:'row'}}>
     <Box> <Box sx={{borderRadius:'5px', backgroundColor:'red',color:'#ffffff',width:'60px',marginBottom:'5px'}}>-{item.price*.1}$</Box>
      <Typography sx={{color:'#777777',textDecoration:'line-through'}}>Price:{item.price+item.price*.1}$</Typography>
      <Typography sx={{color:'green',fontSize:'20px'}}>Price:{item.price}$</Typography>
      </Box>
      <IconButton>
            <ChatIcon/>
          </IconButton>
    </Box>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
      <Divider inset="context" />
      <CardContent orientation='horizontal'>
          <Button sx={{
            color:'#ffff',
            backgroundColor:'red',
            width:'50%'
          }}><ShoppingCartIcon sx={{marginRight:'5px'}}/> add to cart</Button>
          <IconButton>
            <FavoriteBorderIcon/>
          </IconButton>
     
      </CardContent>
      </CardOverflow>
    </Card>
  )
}
