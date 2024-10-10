import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetCartQuery, useGetProductByIdQuery,useUpdateCartItemQuantityMutation } from '../../redux/rtk/productsApi';
import { RootState } from '../../redux/store';
import { jwtDecode } from "jwt-decode";

interface IJWT{
    id:string;
    email:string;
    isAdmin:boolean
}
interface ICartItem{
  productId:string;
  productType:string;
  quantity:number;

}

export const CartPage = () => {
    const accessToken=useSelector((state:RootState)=>state.token.accessToken)
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
  const { data: CartData, isLoading, error } = useGetCartQuery(userId||'',{
    skip:!userId
  });


  if (error) return <div>Cart is empty</div>
  if (isLoading) return <div>Loading</div>
  if(!userId) return <div>Not login</div>
  return (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
      {userId?(CartData?.map((cartItem) => (
        <CartItem key={cartItem.productId} cartItem={cartItem} userId={userId&&userId} />
      ))):(<></>)}
    </Box>
  );
}

interface CartItemProps {
  cartItem: ICartItem; // Подставьте правильный тип для cartItem
  userId:string
}


const CartItem: React.FC<CartItemProps> = ({ cartItem,userId}) => {
  const [update,{error,isLoading,isSuccess}]=useUpdateCartItemQuantityMutation()
  const { productId } = cartItem;
  
  // Используем хук для получения данных о продукте
  const { data: productData, isLoading: productLoading } = useGetProductByIdQuery(productId);

    const handleQuantityChange = async (item: ICartItem, newQuantity: number) => {
    console.log("itemmmm", item);
    const { productType, productId } = item;

    // Проверьте, что productId определен
    if (!productId) {
        console.error("Product ID is not defined");
        return;
    }

    try {
      console.log("userId",userId)
      update({
        userId:userId,
        productId: item.productId, // Убедитесь, что productId определен
        productType:productType,
        quantity: newQuantity,
      });
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
};
  if (productLoading) return <div>Loading product...</div>;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
      <img src={productData?.imageURL[0]} width={50} height={50} alt={productData?.brand} />
      <Box sx={{ marginLeft: '20px' }}>
        <Typography variant="h6">{productData?.brand} / {productData?.model}</Typography>
        <Typography variant="body1">Quantity: {cartItem.quantity}</Typography>
        <Typography variant="body1">Price: {productData?.price}$</Typography>
        <Button onClick={()=>handleQuantityChange(cartItem,cartItem.quantity-1)}>-</Button>
        <Button onClick={()=>handleQuantityChange(cartItem,cartItem.quantity+1)}>+</Button>
     
      </Box>
    </Box>
  );
}


function updateCartItemQuantity(arg0: {
 productId: string; // Убедитесь, что productId определен
  productType: string; quantity: number;
}) {
  throw new Error('Function not implemented.');
}