import React, { FC, memo, useEffect, useState } from 'react';
import {RenderedProduct,ICart, IWishAdd} from '@/types/types'
import { Box, Button, Typography,IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RootState } from '@/redux/store';
import { jwtDecode } from 'jwt-decode';
import {useAddToWishListMutation}from '../../redux/rtk/productsApi'
import {toast,Bounce, ToastContainer} from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
const infoBoxStyle={
    width:'40%',
    display:'flex',
    flexDirection:'column',
    // backgroundColor:'#ffff',
    height:'90%',
    border:'none',
    paddingRight:'20px'


}
interface detailProps{
    product:RenderedProduct,
    handleAddToCart:(cartItem:ICart)=>void,
    handleAddToWishList:(wishListItem:IWishAdd)=>void,
    isInCart:boolean,
    inWishList:boolean;

}


export const FunctionalityComponent:FC<detailProps> =memo( ({product,handleAddToCart,isInCart,inWishList,handleAddToWishList}) => {
  const accessToken=useSelector((state:RootState)=>state.token.accessToken)
  let userId: string | null = null;
  if (accessToken) {
    try {
      const decoded: any = jwtDecode(accessToken);
      userId = decoded?.id;
    } catch (error) {
      console.error( error);
      userId = null;
    }
  }


  return (
    <Box sx={infoBoxStyle}>
        <Box sx={{display:'flex',flexDirection:'column',width:'100%',marginBottom:'2px',padding:'20px',backgroundColor:'#ffff',flex:1,borderRadius:'20px 20px 0 0 '}}>
          <Typography variant='h5' sx={{fontWeight:'600',letterSpacing:'2px'}}>{product?.brand } {product?.model} /{product?.screenSize}</Typography>
          <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Box sx={{flex:2,display:'flex',flexDirection:'row'}}>
              <Box sx={{border:'1px solid gray',display:'flex',flexDirection:'row',marginRight:'5px',borderRadius:'20px',justifyContent:'space-between',alignItems:'end',padding:'5px'}}>
                <ChatIcon style={{  fontSize: 25,marginRight:'5px' }} />
              <Typography variant='h6' fontSize={18} color='#777777'>comments {product.comments?.length}</Typography>
              </Box>
              <Box sx={{border:'1px solid gray',display:'flex',flexDirection:'row',borderRadius:'20px',justifyContent:'space-between',alignItems:'end',padding:'5px'}}>
                <VisibilityIcon style={{  fontSize: 25,marginRight:'5px' }} />
              <Typography variant='h6' fontSize={18} color='#777777'>{product.views} views </Typography>
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
          {
            !isInCart?(<Button
              onClick={()=>{
                if(product&&product._id&&userId)
                {handleAddToCart({productId:product._id,userId:userId,productType:product.categoryName,quantity:1})}
              }
              }
            sx={{height:'50px',backgroundColor:'red',color:'#ffffff',borderRadius:'20px',width:'100%'}}>
              <IconButton><ShoppingCartIcon sx={{fill:'#ffffff'}}/></IconButton>
              Add to Cart
            </Button>):
            (<Button sx={{height:'50px',backgroundColor:'#fffff',color:'black',borderRadius:'20px',width:'100%',border:'1px solid black'}}>
              <IconButton>
                <CheckCircleIcon sx={{fill:'green',fontSize:'24px'}}/>
              </IconButton>
              Added to cart
            </Button>)
          }

          </Box>
          <Box sx={{flex:1,display:'flex',flexDirection:'row',marginLeft:'10px'}}>

          <Box sx={{flex:4}}>
            <Button sx={{height:'50px',backgroundColor:'#ffff',color:'#323232',borderRadius:'20px',width:'100%',border:'1px solid black',}}> <AdsClickIcon/>Buy in one Click</Button>
            </Box>
          <Box sx={{flex:1, backgroundColor:'#F7F5F5',borderRadius:'12px',marginLeft:'10px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
           {
            inWishList?(<IconButton>
                <FavoriteIcon sx={{fill:'red'}}/>
            </IconButton>)
            :(<IconButton onClick={()=>{
              if(product&&product._id&&userId)
              handleAddToWishList({userId:userId,productId:product._id,productType:product.categoryName})
            }}
            ><FavoriteBorderIcon/></IconButton>)
           }
          </Box>
          </Box>
        </Box>
        </Box>
      </Box>
  )
})
