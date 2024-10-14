import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddToCartMutation, useGetCartQuery, useGetProductByIdQuery, useUpdateProductViewsMutation } from '../../redux/rtk/productsApi';
import { Box } from '@mui/material';
import Youtube from 'react-youtube';
import { FunctionalityComponent } from './FunctionalityComponent';
import { DetailImagesComponent } from './DetailImagesComponent';
import { Features } from './Features';
import { RenderedProduct,ICart,ICartQuery,ICartItem } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';


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
  const [updateView,{error:viewError,isLoading:isViewLoading}]=useUpdateProductViewsMutation()
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId!);
  const dispatch=useDispatch();
  
  const accessToken=useSelector((state:RootState)=>state.token.accessToken)
  let userId: string | '' = '';
  if (accessToken) {
    try {
      const decoded: any = jwtDecode(accessToken);
      userId = decoded?.id; // получаем id пользователя
    } catch (error) {
      console.error('Ошибка декодирования токена:', error);
      userId = ''; // Если токен некорректен
    }
  }
  const {data:Cart,error:cartError,isLoading:isCartError}=useGetCartQuery(userId||'',{skip:!userId})
  const [addToCart,{data,isLoading:cartIsLoading}]=useAddToCartMutation()
  const images=product?.imageURL;
  const [currentImage, setCurrentImage] = useState<string | undefined>(product?.imageURL[0]);
  const [openModal,setOpenModal]=useState(false)
  const [isInCart, setIsInCart] = useState(false); 



  useEffect(()=>{
     if(!cartError){
      if(product?.categoryName&& product._id){
        updateView({id:product._id,category:product?.categoryName})
      }
     }
  },[productId,updateView,product]);

  // useEffect(() => {

  //  if(!cartError){
  //   if (Cart && product) {
  //     const itemInCart = Cart.some((item: ICartItem) => item.productId._id === product._id);
  //     setIsInCart(itemInCart);
  //   }
  //  }
  // }, [CartItems, product]);




  const handleThumbnailClick = useCallback((imageUrl: string) => {
    setCurrentImage(imageUrl);
  }, []);


  const handleAddToCart = useCallback(async (cartItem: ICart) => {
 
    try {
      await addToCart(cartItem);

    } catch (error) {
      console.error('Error adding to cart', error);
    }
  }, [addToCart]);

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
     
         <FunctionalityComponent product={product} handleAddToCart={handleAddToCart} isInCart={isInCart} />
    
          </Box>
        <Features product={product}/>
      </>)
    }
    
    </Box>
  );
};
