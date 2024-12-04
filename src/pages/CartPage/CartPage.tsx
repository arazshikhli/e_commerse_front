import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { jwtDecode } from 'jwt-decode';
import { useGetCartProductsQuery, useGetProductByIdQuery, useUpdateCartItemQuantityMutation } from '../../redux/rtk/productsApi';
import { CartProducts, RenderedProduct } from '@/types/types';
import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { IJWT } from '@/types/types';
interface ICartItem{
    product:RenderedProduct;
    quantity:number;

}

export const CartPage = () => {
    const accessToken=useSelector((state:RootState)=>state.token.accessToken)

    const [update,{error:updateError,isLoading:isUpdateLoading,isSuccess}]=useUpdateCartItemQuantityMutation()
    let userId: string  = '';
    if (accessToken) {
      try {
        const decoded: IJWT = jwtDecode<IJWT>(accessToken);
        userId = decoded?.id; // получаем id пользователя
      } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        userId = ''; // Если токен некорректен
      }
    }
    const { data: CartProducts, isLoading:isCartLoading, error:cartError } = useGetCartProductsQuery(userId||'',{
      skip:!userId
    });
    const [cartItemsCount,setCartItemsCount]=useState(0)
   useEffect(()=>{
    if(CartProducts){
      let count=0;
      for(let i=0;i<CartProducts?.length;i++){
      count+=CartProducts[i].quantity;
      }
      setCartItemsCount(count);
    }
   },[CartProducts])

    const handleQuantityChange=async(userId:string,productId:string,productType:string,quantity:number)=>{
        try{
            update({userId,productId,productType,quantity})
        }
        catch(err){
            console.log(err);

        }
    }

    if (cartError) return <div>Cart is empty</div>
    if (isCartLoading) return <div>Loading</div>
    if(!userId) return <div>Not login</div>
  return (
    <Box ml={1} display={'flex'} flexDirection={'row'} gap={2}>
       <Box sx={{width:'70%',display:'flex',flexDirection:'column',marginTop:'10px'}}>
        <Box sx={{width:'100%',backgroundColor:'#EEA0E0',padding:'10px',borderRadius:'20px 20px 0 0 '}}>
          <Typography>Product: {cartItemsCount} pieces</Typography>
        </Box>
        <Box sx={{width:'100%',marginTop:'3px',display:'flex',flexDirection:'row',backgroundColor:'#EEA0E0',padding:'10px'}}>
          <Button sx={{border:'none',borderRadius:'20px',color:'#ffff'}}>Select All</Button>
          <Button sx={{border:'none',borderRadius:'20px',color:'#ffffff'}}> delete selected</Button>
        </Box>
        <Box sx={{width:"100%",display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        {
          CartProducts&&CartProducts.map((product:CartProducts)=>{
            return <Box key={product.product._id}
             sx={{width:"100%",display:'flex',
             flexDirection:'row',border:'none',marginTop:'2px',backgroundColor:'#FE7899',padding:'10px'}}>
                <Box sx={{flex:1,display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'10px'}}>
                <img src={product.product.imageURL[0]} width={60} height={60} style={{marginRight:'10px'}}/>
                <Typography sx={{fontSize:'18px',fontWeight:'600',letterSpacing:'2px',color:'white'}}>{product.product.brand} {product.product.model} </Typography>
                <Typography sx={{color:'red'}}> ({product.product.price+product.product.price*.1}$)</Typography>
                </Box>
                <Box sx={{flex:1,display:'flex',flexDirection:'row'}}>
                  <Box sx={{flex:1,display:'flex',flexDirection:'row',alignItems:'center'}}>
                  <IconButton onClick={()=>{
                      if(product.product._id)handleQuantityChange(userId,product.product._id,product.product.categoryName,product.quantity-1)
                    }}>
                      <RemoveCircleOutlineIcon sx={{fill:'white'}}/>
                    </IconButton>
                    <Typography sx={{color:'white',margin:'0 10px',fontWeight:'600'}}>{product.quantity}</Typography>
                    <IconButton onClick={()=>{
                      if(product.product._id)handleQuantityChange(userId,product.product._id,product.product.categoryName,product.quantity+1)
                    }}>
                    <AddCircleOutlineIcon sx={{fill:'white'}}/>
                    </IconButton>
                  </Box>
                  <Box sx={{flex:1,display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Box sx={{display:'flex',flexDirection:'row',marginRight:'10px',gap:'10px',alignItems:'center'}}>
                      <Typography sx={{textDecoration:'line-through',color:'white'}}>{(product.product.price+product.product.price*.1)*product.quantity}$</Typography>
                      <Typography sx={{color:'red',fontSize:'20px',fontWeight:'600'}}>{product.product.price*product.quantity}$</Typography>
                    </Box>
                  </Box>
                  <Box sx={{flex:1,height:'100%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                    <IconButton onClick={()=>{
                      if(product.product._id)handleQuantityChange(userId,product.product._id,product.product.categoryName,0)
                    }}>
                    <DeleteIcon sx={{fill:'white'}}/>
                    </IconButton>
                     </Box>
                </Box>

            </Box>
          })
        }
        </Box>
       </Box>
       <Box sx={{width:'30%',display:'flex',flexDirection:'column',margin:'0 10px',padding:'10px',color:'white'}}>
          <Box sx={{border:'none',width:'100%',padding:'10px',
          display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',
          borderRadius:'20px 20px 0 0 ',backgroundColor:'#FE7899',marginBottom:'3px'}}>
          <Typography>Products: </Typography><Typography>{cartItemsCount}</Typography>
          </Box>
       </Box>

    </Box>
  )
}
