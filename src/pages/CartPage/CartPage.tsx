import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';
import { useGetCartProductsQuery, useGetProductByIdQuery, useUpdateCartItemQuantityMutation } from '../../redux/rtk/productsApi';
import { RenderedProduct } from '../../types/types';
import { Box, Button, Card, Typography } from '@mui/material';


interface IJWT{
    id:string;
    email:string;
    isAdmin:boolean
}
interface ICartItem{
    product:RenderedProduct;
    quantity:number;

}

export const CartPage = () => {
    const accessToken=useSelector((state:RootState)=>state.token.accessToken)
    const [products, setProducts] = useState<RenderedProduct[]>([]);
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
    const [update,{error:updateError,isLoading:isUpdateLoading,isSuccess}]=useUpdateCartItemQuantityMutation()
  
    const {data:productById,error,isLoading}=useGetProductByIdQuery('')

    const [cartItemsCount,setCartItemsCount]=useState(CartProducts?.length)


    const handleQuantityChange=async(userId:string,productId:string,productType:string,quantity:number)=>{
        try{
            update({userId,productId,productType,quantity})
        }
        catch(err){
            console.log(err);
            
        }
    }

  console.log(CartProducts);
  
    if (error) return <div>Cart is empty</div>
    if (isLoading) return <div>Loading</div>
    if(!userId) return <div>Not login</div>
  return (
    <Box>
        {CartProducts&&CartProducts.map((cartItem:ICartItem)=>{
            return <Card key={cartItem.product._id}>
            <Typography variant="h6">{cartItem.product.model}</Typography>
            <Typography variant="body2">Price: ${cartItem.product.price}</Typography>
            <Typography variant="body2">Quantity: {cartItem.quantity}</Typography>
            <Typography variant="body2">Description: {cartItem.product.description}</Typography> 
            <Button onClick={()=> 
                {if(cartItem.product._id){handleQuantityChange(userId,cartItem?.product._id,cartItem.product.categoryName,cartItem.quantity-1)}}} >-</Button>
            <Typography>{cartItem.quantity}</Typography>
            
            <Button onClick={()=> 
                {if(cartItem.product._id){handleQuantityChange(userId,cartItem?.product._id,cartItem.product.categoryName,cartItem.quantity+1)}}} >+</Button>
            </Card>
        })}
{/* {CartData &&
        CartData.map((cartItem: ICartItem, index: number) => (
          <Card key={index} sx={{ margin: 2, padding: 2 }}>
            <Typography variant="h6">{cartItem.product.name}</Typography>
            <Typography variant="body2">Price: ${cartItem.product.price}</Typography>
            <Typography variant="body2">Quantity: {cartItem.quantity}</Typography>
            <Typography variant="body2">Description: {cartItem.product.description}</Typography>
          </Card>
        ))} */}
       {/* {
            CartData&&CartData.map((product:ICartItem)=>{
                return <Card>
                    <Typography>{}</Typography>
                    <Typography></Typography>
                </Card>
            })
        }  */}
    </Box>
  )
}
