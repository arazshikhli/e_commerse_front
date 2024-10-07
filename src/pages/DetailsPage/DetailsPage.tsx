import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddToCartMutation, useGetCartQuery, useGetProductByIdQuery } from '../../redux/rtk/productsApi';
import { Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Typography } from '@mui/material';
import Youtube from 'react-youtube';
import YouTubeIcon from '@mui/icons-material/YouTube';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FunctionalityComponent } from './FunctionalityComponent';
import { DetailImagesComponent } from './DetailImagesComponent';
import { Features } from './Features';
import { RenderedProduct,ICart,ICartQuery,ICartItem } from '../../types/product.interfaces';
import { useSelector } from 'react-redux';
import { userID } from '../../redux/baseReduxSlices/authSlice';


interface YouTubeEmbedProps {
    videoId: string;
  }
  
  const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };
  
    return <Youtube videoId={videoId} opts={opts} />;
  };
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    justifyContent:'center',alignItems:'center'
  };
const boxStyles = {
    width:'100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '16px',
    flex: 1,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
    };
const firstBox={
    width:'100%',
    height:'600px',
    display:'flex',
    flexDirection:'row',
    gap:'3',
    justifyContent:'space-around',
    alignItems:'center',
    borderRadius:'20px'
}
const infoBoxStyle={
    width:'48%',
    display:'flex',
    flexDirection:'column',
    // backgroundColor:'#ffff',
    height:'90%',
    border:'none',
    borderRadius:'10px',
    
}

export const DetailsPage = () => {
  const { id: productId } = useParams<{ id: string }>();

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId!);
  const userId=useSelector(userID)
  const {data:CartItems}=useGetCartQuery(userId)
  const [addToCart,{data,isLoading:cartIsLoading}]=useAddToCartMutation()
  const images=product?.imageURL;
  const [currentImage, setCurrentImage] = useState<string | undefined>(product?.imageURL[0]);
  const [openModal,setOpenModal]=useState(false)
  const [isInCart, setIsInCart] = useState(false); 

  console.log(CartItems);
  
  console.log(isInCart);

  useEffect(() => {
    if (CartItems && product) {
      const itemInCart = CartItems.items.some((item: ICartItem) => item.productId._id === product._id);
      setIsInCart(itemInCart);
    }
  }, [CartItems, product]);

  useEffect(()=>{
    console.log(openModal)
  },[openModal])
  const handleThumbnailClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);
  const handleAddToCart=async(cartItem:ICart)=>{
    try {
      
      await addToCart(cartItem)
      
    } catch (error) {
      
    }
  } 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product details</div>;
  }

  return (
    <Box sx={boxStyles}>
    {
      product&&( <>
        <Box sx={firstBox}> 
        <DetailImagesComponent currentImage={currentImage} handleThumbnailClick={handleThumbnailClick} images={images} product={product}/>
     
         <FunctionalityComponent product={product} handleAddToCart={handleAddToCart} isInCart={isInCart}/>
    
          </Box>
        <Features product={product}/>
      </>)
    }
    
    </Box>
  );
};
