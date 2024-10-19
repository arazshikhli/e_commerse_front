import React, { FC, memo, useEffect, useState } from 'react'
import { ICartQuery, IWishList, IWishListQuery, RenderedProduct } from '@/types/types'
 import Card from '@mui/joy/Card';
 import AspectRatio from '@mui/joy/AspectRatio';
 import CardContent from '@mui/joy/CardContent';
 import CardOverflow from '@mui/joy/CardOverflow';
 import Divider from '@mui/joy/Divider';
 import Typography from '@mui/joy/Typography';
 import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, Grid, IconButton, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import {useUpdateRatingMutation,useAddToCartMutation} from '../../../redux/rtk/productsApi'

interface ProductItemProps {
  item: RenderedProduct;
  addToWishList: (wishListData: { userId: string; productId: string; productType: string }) => Promise<any>;
  removeFromWishList: (product: { userId: string; productId: string; productType: string }) => Promise<any>;
  userId:string|null ;// Изменено здесь
  wishList:IWishListQuery[]|undefined;
  removeWishError:any;
  isRemoveWishSuccess:boolean
  cartData:ICartQuery[]|undefined
}
export const ProductItem:FC<ProductItemProps> =memo(({item,addToWishList,userId,wishList,cartData,
  removeFromWishList,isRemoveWishSuccess,removeWishError}) => {
    const [addToCart]=useAddToCartMutation()
    const [updateRating]=useUpdateRatingMutation()
  const [currentRating, setCurrentRating] = useState<number | null>(null); 
  const [inWishlist,setInWishList]=useState(false);
  const [inCart,setInCart]=useState(false)

 
  const handleRatingChange = async (newValue: number | null) => {
    setCurrentRating(newValue);
    if (item._id) {
      await updateRating({ productId: item._id, rating: newValue||0 ,categoryName:item.categoryName}); // Обновление рейтинга
    }
  };
  const navigate=useNavigate()


  const handleNavigate=(id:string)=>{
    navigate(`/products/detail/${id}`)
  }
  const handleAddToWishList=(userId:string,productId:string,productType:string)=>{
    console.log(userId);
    
  const  wishListData={userId,productId,productType};
   addToWishList(wishListData)
  }

  const handleRemoveFromWishlist=async(userId:string,productId:string,productType:string)=>{
   await removeFromWishList({userId,productId,productType})
    if(removeWishError){
      console.log("Error");
    }
    if(isRemoveWishSuccess){
      console.log('successss');

    }
  }
  const handleAddToCart=(userId:string,productId:string,productType:string,quantity:number)=>{
    addToCart({userId,productId,productType,quantity})
  }
  useEffect(()=>{
    if(cartData){
      const isInCartData=cartData.some(
        (cartItem)=>
          cartItem.productId===item._id
      )
      setInCart(isInCartData)
    }
  },[cartData,item])
  
  useEffect(() => {
    console.log(inWishlist);
    
    if (wishList) {
      const isInWishList = wishList.some(
        (wishItem) =>
          wishItem.productId === item._id 
      );
      setInWishList(isInWishList);
    }
  }, [wishList, item]);


  return (
  
        <Card sx={{width:300,cursor:'pointer'}} variant='outlined' onClick={(e)=>{
      if(item._id){handleNavigate(item._id)}}}>
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
      <CardContent orientation='horizontal' >
         <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
          {
            !inCart?(  <Button
              onClick={(e)=>{
                e.stopPropagation();
                if(userId&&item._id)
                handleAddToCart(userId,item._id,item.categoryName,1)
              }}
              sx={{
              color:'#ffff',
              backgroundColor:'red',
          
            }}><ShoppingCartIcon sx={{marginRight:'5px'}}
            /> add to cart</Button>):(
              <Button  sx={{
                backgroundColor:'green',
                color:'#fff'
              }}>In Cart</Button>
            )
          }
       {!inWishlist?   <IconButton 
          onClick={(e)=>{
            e.stopPropagation();
            if(userId&&item._id)
            handleAddToWishList(userId,item._id,item.categoryName)
          }}  
          >
            <FavoriteBorderIcon/>
          </IconButton>:
          <IconButton  onClick={(e)=>{
            e.stopPropagation();
            if(userId&&item._id)
            handleRemoveFromWishlist(userId,item._id,item.categoryName)
          }}  >
             <FavoriteIcon sx={{fill:'red'}}/>
          </IconButton>
     } 
         </Box>
      </CardContent>
      <Divider/>
      <CardContent>
      <Rating 
      value={item.rating?.average}
      />
      </CardContent>
      </CardOverflow>
    </Card>

  
  )
})
