import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddToCartMutation, useAddToWishListMutation, useGetCartProductsQuery, useGetCartQuery, useGetProductByIdQuery, useGetWishListProductsQuery, useUpdateProductViewsMutation } from '../../redux/rtk/productsApi';
import { Box } from '@mui/material';
import { FunctionalityComponent } from './FunctionalityComponent';
import { DetailImagesComponent } from './DetailImagesComponent';
import { Features } from './Features';
import { IAddCommentQuery, ICart, IWishAdd } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';
import {useGetAverageRatingQuery,useUpdateRatingMutation,useAddCommentMutation,useGetCommentsQuery} from '../../redux/rtk/productsApi'
import { toast } from 'react-toastify';
import { CommentsComponent } from './CommentsComponent';

  interface RatingResponse {
    averageRating: number;
    totalRatings: number;

  }

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
  const [updateRating,{error:ratingError,isLoading:isRatingUpdateLoading,isSuccess:isRatingUpdateSuccess}]=useUpdateRatingMutation()
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId||'',{skip:!productId});
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
  const { data:cartProducts,error:cartError,isLoading:isCartLoading}=useGetCartProductsQuery(userId||'',{skip:!userId})
  const {data:wishList,error:wishListError,isLoading:isWishListLoading}=useGetWishListProductsQuery(userId||'',{skip:!userId})
  const [addToCart,{error:addCartError,isSuccess:isAddCartSuccess}]=useAddToCartMutation()
  const [addToWishList,{error:addWishError,isSuccess:isAddWishSuccess}]=useAddToWishListMutation();
  const {data:averageRating,isLoading:isAverageLoading,error:averageError}=useGetAverageRatingQuery({productId:product?._id||'',categoryName:product?.categoryName||''},{skip:!product?._id||!product?.categoryName})
  const [addComment,{error:addCommentError,isSuccess:isAddCommentSuccess}]=useAddCommentMutation();
  const {data:comments,error:commentsError,isLoading:isCommentsLoading}=useGetCommentsQuery({model:product?.model||'',productType:product?.categoryName||''},{skip:!product?.model||!product.categoryName})
  const images=product?.imageURL;
  const [currentImage, setCurrentImage] = useState<string | undefined>(product?.imageURL[0]);
  const [isInCart, setIsInCart] = useState(false);
  const [inWishList,setIsWishList]=useState(false);
  const [isViewUpdated, setIsViewUpdated] = useState(false);


  useEffect(()=>{
    if(product){
      setCurrentImage(product.imageURL[0])
    }
  },[product])

  useEffect(() => {
    if (product && !isViewUpdated) {
      if (product.categoryName && product._id) {
        updateView({ id: product._id, category: product.categoryName });
        setIsViewUpdated(true);
      }
    }
  }, [product, updateView, isViewUpdated]);

  useEffect(()=>{
    let inWish=false
    if(wishList&&product&&product._id){
      for(let i=0;i<wishList?.length;i++){
        if(wishList[i].product._id===product._id){
          inWish=true;
          break;
        }
      }
      setIsWishList(inWish);
    }
  },[wishList])
  useEffect(() => {
    let inCart=false;
    if(cartProducts&&product&&product?._id){
      for(let i=0;i<cartProducts?.length;i++){
        if(cartProducts[i].product._id===product._id){
          inCart=true;
          break;
        }
      }
      setIsInCart(inCart)
    }
  }, [cartProducts]);

  useEffect(()=>{
    if(isAddCartSuccess){
      toast.success('product added to cart successfully')
    }
    if(addCartError){
      toast.warning('Problem in adding')
    }
  },[isAddCartSuccess,addCartError])
  useEffect(()=>{
    if(isAddWishSuccess){
      toast.success('product added to wish list successfully')
    }
    if(addWishError){
      toast.warning('Problem in adding')
    }
  },[isAddWishSuccess,addWishError])

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

  const handleAddToWishList=useCallback(async(wishListItem:IWishAdd)=>{
    try{
      await addToWishList(wishListItem)
      if(isAddWishSuccess){
        console.log('success wish')
      }
    }
    catch(err){
      console.log(err)
    }
  },[addToWishList]);

  const handleAddComment = useCallback(async (comment: IAddCommentQuery) => {

    try {
      await addComment(comment);

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
         <FunctionalityComponent product={product}
         handleAddToCart={handleAddToCart}
         handleAddToWishList={handleAddToWishList}
         isInCart={isInCart} inWishList={inWishList}
          />
          </Box>
        <Features product={product}/>
      </>)
    }
      <CommentsComponent product={product}/>
    </Box>
  );
};
