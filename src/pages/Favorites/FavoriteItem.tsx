
 import React,{useState, FC, useEffect} from 'react'
 import { IWishList} from '../../types/types';
 import { Box,Typography, IconButton, Divider,Button } from '@mui/material';
 import AspectRatio from '@mui/joy/AspectRatio';
 import Card from '@mui/joy/Card';
 import CardContent from '@mui/joy/CardContent';
 import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
 import {toast,Bounce} from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useGetCartQuery } from '../../redux/rtk/productsApi';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface FavoriteItemProps{
    userId:string|null ;
    product:IWishList;
    removeFromWishList: (product: { userId: string; productId: string; productType: string }) => Promise<any>;
    addToCart:(product:{userId: string; productId: string; productType: string;quantity:number})=>Promise<any>;
    removeError:FetchBaseQueryError|SerializedError|undefined;
    isRemoveSuccess:boolean;
    addCartError:FetchBaseQueryError|SerializedError|undefined;
    isAddCartSuccess:boolean
}
export const FavoriteItem:FC<FavoriteItemProps> = ({product,userId,removeFromWishList,
    removeError,isRemoveSuccess,addToCart,addCartError,isAddCartSuccess}) => {
      const {data:cartData}=useGetCartQuery(userId||'',{skip:!userId});
    const [inCart,setInCart]=useState(false)

      useEffect(()=>{
        console.log(inCart)
        let isInCart=false
        if(cartData){
          for(let i=0;i<cartData.length;i++){
            console.log(`${cartData[i].productId}//${product.product._id}`)
            if(cartData[i].productId===product.product._id)

            isInCart=true;

          }
          setInCart(isInCart)
        }
      },[cartData,product])

  const handleRemove=async(userId:string,productId:string,productType:string)=>{
    await removeFromWishList({userId,productId,productType})
    if(removeError){
     console.log('error');
    }
    if(isRemoveSuccess){
     console.log('deleted')
     toast.success(' product deleted from favorite list successfully!', {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       transition: Bounce,
       })
    }
 }



 const handleAddToCart=async(userId:string,productId:string,productType:string,quantity:number)=>{
   await addToCart({userId,productId,productType,quantity});
   if(addCartError){
     toast.warn(' error in added to cart!', {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       transition: Bounce,
       })
   }
   if (isAddCartSuccess){
     toast.success(' product added to Cart successfully!', {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       transition: Bounce,
       })
   }
 }
  return (
    <Card key={product.product._id} variant="outlined" sx={{ width: 300,height:'400px',position:'relative' }}>
                 <IconButton
                 onClick={()=>
                  {
                    if(product.product._id&&userId)
                    handleRemove(userId,product.product._id,product.product.categoryName)
                  }}
                 sx={{position:'absolute',top:'5px',right:'5px',zIndex:'1000'}}>
                  <RemoveCircleOutlineIcon/>
                 </IconButton>
                <AspectRatio minHeight="120px" maxHeight="200px">
                <img
          src={product.product.imageURL[0]}
          srcSet={product.product.imageURL[0]}
          loading="lazy"
          alt={product.product.model}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
            zIndex:'900'
        }}
        />
                </AspectRatio>
                <CardContent orientation="horizontal">
                <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>

                 <Box> <Typography sx={{fontSize:'18px',fontWeight:'600'}}>{product.product.brand}  {product.product.model}/
                  {product.productType==='TV'?`${product.product.resolution}`:`${product.product.storage}`}
                  </Typography>
                  </Box>
                  <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>
                    <Box sx={{backgroundColor:'red',color:'#fff',borderRadius:'5px',padding:'5px',maxWidth:'60px'}}>
                    <Typography>-${product.product.price*.1}</Typography>
                    </Box>
                    <Typography sx={{textDecoration:'line-through',color:'#43373D',letterSpacing:'1.5px'}}>${product.product.price+product.product.price*0.1}</Typography>
                    <Typography sx={{color:'red',fontSize:'22px',fontWeight:'600'}}>${product.product.price}</Typography>
                  </Box>
                </Box>
                </CardContent>
                <Divider/>
                {
                  inCart?(<Button sx={{
                   border:'2px solid #97CA00'
                  }} disabled>
                    <ShoppingCartIcon sx={{fill:'#97CA00'}}/> <Typography sx={{color:'#97CA00',marginLeft:'20px'}}>added in cart</Typography>
                  </Button>):(<Button
                  sx={{backgroundColor:'red'}}
                  onClick={()=>{
                    if(userId&& product.product._id){
                      handleAddToCart(userId,product.product._id,product.product.categoryName,1)
                    }
                  }}
                  >
                    <ShoppingCartCheckoutIcon sx={{fill:'#fff'}}/><Typography sx={{color:'#fff',marginLeft:'20px'}}>add to cart</Typography>
                  </Button>)
                }
              </Card>
  )
}
