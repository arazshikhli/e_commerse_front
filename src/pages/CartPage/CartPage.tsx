import React from 'react'
import { useSelector } from 'react-redux';
import {userID} from '../../redux/baseReduxSlices/authSlice';
import {useGetCartQuery,useUpdateCartItemQuantityMutation}from '../../redux/rtk/productsApi';
import { Box, Button, Select, Typography } from '@mui/material';
import { DetailsPage } from '../DetailsPage/DetailsPage';
import { RenderedProduct,ICartQuery,ICartItem } from '../../types/product.interfaces';
import { BorderRight, CheckBox, Height } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CartStyle={
    width:'100%',
    display:'flex',
    flexDirection:'column',
    marginTop:'20px',
    height:'800px'
}
const itemListStyle={
    flex:2,
    height:'100%',
    borderRadius:'20px',
    padding:'20px',
    margin:'20px 10px',
    width:'100%'
} 
const priceStyle={
    flex:1,
    height:'100%',
      borderRadius:'20px',
      padding:'20px',
      margin:'20px 10px 20px 0px',
      display:'flex',
      flexDirection:'column',
}   
const itemStyle={
    width:'100%',
    backgroundColor:'#ffffff',
    display:'flex',
    flexDirection:'row',
    gap:3,
    border:'1px solid gray',
    marginBottom:'3px',
    borderRadius:'20px',
    alignItems:'center',
    paddingLeft:'10px',
    justifyContent:'space-between'
    
}
export const CartPage = () => {
const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
const userId=useSelector(userID)
const {data:CartData,isLoading,error}=useGetCartQuery(userId);

const items=CartData?.items;


const handleQuantityChange = async (item: ICartItem, newQuantity: number) => {
    console.log("itemmmm", item);
    const { productType, productId } = item;

    // Проверьте, что productId определен
    if (!productId || !productId._id) {
        console.error("Product ID is not defined");
        return;
    }

    try {
        await updateCartItemQuantity({
            userId,
            productId: productId._id, // Убедитесь, что productId определен
            productType,
            quantity: newQuantity,
        });
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
};

if(isLoading) return <div>Loading</div>
if(error)return <div>Error</div>


  return (
   <Box sx={CartStyle}>
    <Box sx={{width:'100%',display:'flex',flexDirection:'row'}}>
        <Box sx={itemListStyle}>
            <Box sx={{width:'100%',borderRadius:'20px 20px 0 0 ',marginBottom:'5px',  padding:'20px'}}>
                <Box sx={{backgroundColor:'#ffffff',width:'100%',padding:'20px',borderRadius:'20px 20px 0 0 '}}><Typography >Basket: (10 items)</Typography></Box>
                <Box sx={{width:'100%',height:'100%',marginBottom:'5px',  backgroundColor:'#ffffff',}}>
                    <Button variant='outlined' 
                    sx={{borderRadius:'20px', border:'none',marginRight:'10px',transition:'all 0.6s',color:'#6E6E6E','&:hover':{border:'1px solid #6E6E6E'}}}>
                        Select All</Button>
                    <Button variant='outlined'
                     sx={{borderRadius:'20px', border:'none',marginRight:'10px',transition:'all 0.6s',color:'#777777','&:hover':{border:'1px solid #777777'}}}
                    >
                        <DeleteOutlineIcon/>Remove all
                    </Button>
                </Box>
                <Box sx={{display:'flex',width:'100%',
                    flexDirection:'column',
                    backgroundColor:'#ffffff',
                    padding:'20px',
                    marginTop:'5px',
                  
                }}>
                    {
                        items&&items.map((item:ICartItem)=>{
                            return   (
                                <Box sx={itemStyle}>
                                    <Box sx={{flex:1,display:'flex',flexDirection:'row',alignItems:'center'}}> 
                                    <CheckBox sx={{marginRight:'10px'}}/>
                                <Box sx={{marginRight:'10px'}}> <img src={item.productId.imageURL[0]} width={50} height={50}/></Box>
                                <Typography variant='h5'>{item.productId.brand} / </Typography>
                           
                                <Typography variant='h5'>{item.productId.model}</Typography></Box>
                                    <Box sx={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:'20px'}}>
                                        <Box sx={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <RemoveCircleOutlineIcon sx={{fill:'#777777',marginRight:'10px',cursor:'pointer'}} onClick={() => handleQuantityChange(item, item.quantity - 1)}/>
                                            <Typography>{item.quantity}</Typography>
                                            <AddCircleOutlineIcon sx={{fill:'#777777',marginLeft:'10px',cursor:'pointer'}} onClick={() => handleQuantityChange(item, item.quantity +1)}/>

                                        </Box>
                                        <Box sx={{flex:1,display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'end'}}>
                                           <Typography sx={{color:'red',fontSize:'20px',fontWeight:'600'}}>{item.productId.price},00 $</Typography>
                                           <Typography sx={{color:'#777777',fontSize:'16px',fontWeight:'400',textDecoration:'line-through',marginLeft:'10px'}}>{Number(item.productId.price)+Number(item.productId.price*.10)},00 $</Typography>
                                            <HighlightOffIcon sx={{marginLeft:'10px'}} />
                                        </Box>
                         
                                    </Box>
                            </Box>
                            )  
                        })
                    }
                </Box>
            </Box>
        </Box>
        <Box sx={priceStyle}>
                        <Box sx={{width:'100%',backgroundColor:'#ffffff',
                            borderRadius:'20px 20px 0 0 ',padding:'20px',marginBottom:'3px',
                            display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <Typography>Product(s):</Typography><Typography>{items?.length} pieces</Typography>
                        </Box>
                        <Box sx={{width:'100%',padding:'20px'}}>
                            {
                                items&& items.map((item:ICartItem)=>{
                                    return <Box key={item._id}
                                    sx={{width:"100%",backgroundColor:'#ffffff',marginBottom:'3px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}
                                    >
                                      <Box></Box>
                                      <Box></Box>      
                                    </Box>
                                })
                            } 
                        </Box>
        </Box>
    </Box>
   </Box>
  )
}
