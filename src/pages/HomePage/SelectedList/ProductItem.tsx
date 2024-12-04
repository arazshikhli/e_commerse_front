import React, { FC, memo, useEffect, useState } from 'react';
import {
  ICartQuery,
  IWishList,
  IWishListQuery,
  RenderedProduct,
} from '@/types/types';
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
import {
  useUpdateRatingMutation,
  useAddToCartMutation,
  useAddToWishListMutation,
  useGetWishListQuery,
  useRemoveFromWishListMutation,
} from '../../../redux/rtk/productsApi';
import { toast, Bounce } from 'react-toastify';

interface ProductItemProps {
  item: RenderedProduct;
  userId: string | null;
  cartData: ICartQuery[] | undefined;
}



export const ProductItem: FC<ProductItemProps> = memo(
  ({item,userId,cartData}) => {
    const [
      addToWishList,
      {
        isLoading: wishListAddLoading,
        error: wishListAddError,
        isSuccess: wishListAddSuccess,
      },
    ] = useAddToWishListMutation();
    const {
      data: wishList,
      isLoading: isWishListLoading,
      error: wishListError,
    } = useGetWishListQuery(userId || '', { skip: !userId });
    const [
    removeFromWishList,
    { error: removeWishError, isSuccess: isRemoveWishSuccess },
  ] = useRemoveFromWishListMutation();
    const [addToCart] = useAddToCartMutation();
    const [updateRating] = useUpdateRatingMutation();
    const [currentRating, setCurrentRating] = useState<number | null>(null);
    const [inWishlist, setInWishList] = useState(false);
    const [inCart, setInCart] = useState(false);
    const handleRatingChange = async (newValue: number | null) => {
      setCurrentRating(newValue);
      if (item._id) {
        await updateRating({
          productId: item._id,
          rating: newValue || 0,
          categoryName: item.categoryName,
        }); // Обновление рейтинга
      }
    };

    const navigate = useNavigate();
    const handleNavigate = (id: string) => {
      navigate(`/products/detail/${id}`);
    };
    const handleAddToWishList = (
      userId: string,
      productId: string,
      productType: string
    ) => {

      const wishListData = { userId, productId, productType };
      addToWishList(wishListData);
    };

    const handleRemoveFromWishlist = async (
      userId: string,
      productId: string,
      productType: string
    ) => {
      await removeFromWishList({ userId, productId, productType });
      if (removeWishError) {
        console.log('Error');
      }
      if (isRemoveWishSuccess) {
        toast.success(' product added to Cart successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    };
    const handleAddToCart = (
      userId: string,
      productId: string,
      productType: string,
      quantity: number
    ) => {
      addToCart({ userId, productId, productType, quantity });
    };
    useEffect(() => {
      if (cartData) {
        const isInCartData = cartData.some(
          (cartItem) => cartItem.productId === item._id
        );
        setInCart(isInCartData);
      }
    }, [cartData, item]);
    useEffect(() => {
      if (wishList) {
        const isInWishList = wishList.some(
          (wishItem) => wishItem.productId === item._id
        );
        setInWishList(isInWishList);
      }
    }, [wishList, item]);

    return (
      <Card
        sx={{ cursor: 'pointer' }}
        variant="outlined"
        onClick={(e) => {
          if (item._id) {
            handleNavigate(item._id);
          }
        }}
      >
        <CardOverflow>
          <AspectRatio ratio={'2'}>
            <img
              src={item.imageURL[0]}
              srcSet={item.imageURL[0]}
              loading="lazy"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
              }}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography level="title-md">{item.model}</Typography>
            <Typography level="body-sm">{item.brand}</Typography>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <Box>
              {' '}
              <Box
                sx={{
                  borderRadius: '5px',
                  backgroundColor: 'red',
                  color: '#ffffff',
                  width: '60px',
                  marginBottom: '5px',
                }}
              >
                -{(item.price * 0.1).toFixed(1)}$
              </Box>
              <Typography
                sx={{ color: '#777777', textDecoration: 'line-through' }}
              >
                Price:{item.price + item.price * 0.1}$
              </Typography>
              <Typography sx={{ color: 'green', fontSize: '20px' }}>
                Price:{item.price}$
              </Typography>
            </Box>
            <IconButton>
              <ChatIcon />
            </IconButton>
          </Box>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Box
              width={'100%'}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              {!inCart ? (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (userId && item._id)
                      handleAddToCart(userId, item._id, item.categoryName, 1);
                  }}
                  sx={{
                    color: '#ffff',
                    backgroundColor: 'red',
                    width: '150px',
                  }}
                >
                  <ShoppingCartIcon sx={{ marginRight: '5px' }} /> add to cart
                </Button>
              ) : (
                <Button
                  sx={{
                    border: '2px solid #44CC11',
                    borderRadius: '5px',
                    color: '#44CC11',
                    width: '150px',
                  }}
                >
                  <ShoppingCartIcon
                    sx={{ fill: '#44CC11', marginRight: '10px' }}
                  />{' '}
                  added
                </Button>
              )}
              {}
              {!inWishlist ? (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (userId && item._id)
                      handleAddToWishList(userId, item._id, item.categoryName);
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (userId && item._id)
                      handleRemoveFromWishlist(
                        userId,
                        item._id,
                        item.categoryName
                      );
                  }}
                >
                  <FavoriteIcon sx={{ fill: 'red' }} />
                </IconButton>
              )}
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            {item.rating && item.rating?.ratingSum > 0 ? (
              <Rating value={item.rating?.average} />
            ) : (
              <Rating name="read-only" />
            )}
          </CardContent>
        </CardOverflow>
      </Card>
    );
  }
);


