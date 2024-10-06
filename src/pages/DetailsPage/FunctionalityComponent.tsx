import React, { FC, memo } from 'react';
import {RenderedProduct} from '../../types/product.interfaces'
import { Box, Button, Typography,IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const infoBoxStyle={
    width:'48%',
    display:'flex',
    flexDirection:'column',
    // backgroundColor:'#ffff',
    height:'90%',
    border:'none',
 
    
}
interface detailProps{
    product:RenderedProduct,
    handleAddToCart:(product:RenderedProduct)=>void
}


export const FunctionalityComponent:FC<detailProps> =memo( ({product,handleAddToCart}) => {
  return (
    <Box sx={infoBoxStyle}>
        <Box sx={{display:'flex',flexDirection:'column',width:'100%',marginBottom:'2px',padding:'20px',backgroundColor:'#ffff',flex:1,borderRadius:'20px 20px 0 0 '}}>
          <Typography variant='h5' sx={{fontWeight:'600',letterSpacing:'2px'}}>{product?.brand } {product?.model} /{product?.screenSize}</Typography>
          <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Box sx={{flex:2,display:'flex',flexDirection:'row'}}>
              <Box sx={{border:'1px solid gray',display:'flex',flexDirection:'row',borderRadius:'20px',justifyContent:'space-between',alignItems:'end',padding:'5px',marginRight:'10px'}}> 
                <StarIcon style={{ fill: 'yellow', fontSize: 25,marginRight:'5px' }} />
              <Typography variant='h6' fontSize={18} color='#777777'>5.0</Typography>
              </Box> 
              <Box sx={{border:'1px solid gray',display:'flex',flexDirection:'row',borderRadius:'20px',justifyContent:'space-between',alignItems:'end',padding:'5px'}}> 
                <ChatIcon style={{  fontSize: 25,marginRight:'5px' }} />
              <Typography variant='h6' fontSize={18} color='#777777'>comments 1</Typography>
              </Box> 
            </Box>
            <Box sx={{flex:5,display:'flex',flexDirection:'row',justifyContent:'end'}}>
              <Typography variant='h5' sx={{color:'green'}}>Available in stock</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{width:'100%',backgroundColor:'#ffff',display:'flex',flexDirection:'column',padding:'20px',flex:3}}>
        <Box sx={{backgroundColor:'red',width:'60px',textAlign:'center',borderRadius:'8px'}}>   <Typography variant='h5' color='#ffff'>-{Number(product?.price)*0.10}$</Typography></Box>
        <Box sx={{width:'100%',display:'flex',flexDirection:'row'}}>
          <Typography variant='h5' sx={{color:'red'}}>{product?.price}$</Typography><Typography variant='h5' sx={{color:'#7777',marginLeft:'20px',textDecoration:'line-through'}}>{Number(product?.price)+Number(product?.price)*0.10} $</Typography>
        </Box>
        <Box sx={{width:'100%',display:'flex',flexDirection:'row'}}>
          <Box sx={{flex:1}}>
            <Button 
             onClick={()=>handleAddToCart(product)} sx={{height:'50px',backgroundColor:'red',color:'#ffff',borderRadius:'20px',width:'100%'}}>
              <IconButton 
             >
            <ShoppingCartIcon sx={{fill:'#ffff'}}/>
            </IconButton>
            Add to cart
            </Button>
          </Box>
          <Box sx={{flex:1,display:'flex',flexDirection:'row',marginLeft:'10px'}}>

          <Box sx={{flex:4}}>
            <Button sx={{height:'50px',backgroundColor:'#ffff',color:'#323232',borderRadius:'20px',width:'100%',border:'1px solid black',}}> <AdsClickIcon/>Buy in one Click</Button>
            </Box>
          <Box sx={{flex:1, backgroundColor:'#F7F5F5',borderRadius:'12px',marginLeft:'10px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <IconButton
            sx={{cursor:'pointer'}}
            >
              <FavoriteBorderIcon/>
            </IconButton>
          </Box>
          </Box>
        </Box>
        </Box>


        <Box sx={{flex:1,padding:'20px',backgroundColor:'#ffffff',marginTop:'3px',borderRadius:'0 0 20px 20px'}}>
          <Typography sx={{color:'#323232'}}>Additional services:</Typography> 
          <Box sx={{width:'200px',backgroundColor:'#7777'}}></Box>
        </Box>
      </Box>
  )
})