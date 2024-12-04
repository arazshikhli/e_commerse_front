import { useGetWishListProductsQuery,
   useGetCartQuery,
   useRemoveFromWishListMutation,
  useAddToCartMutation
  } from '../../redux/rtk/productsApi'
import { RootState } from '../../redux/store'
import React,{useState,useMemo, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {IJWT, IWishList} from '../../types/types';
import { jwtDecode } from 'jwt-decode';
import { Box,FormControl,InputLabel,Select,MenuItem,SelectChangeEvent,Typography, IconButton, Divider,Button } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import CardContent from '@mui/joy/CardContent';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {ToastContainer,toast,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FavoriteItem } from './FavoriteItem';
import { tokenFromStore } from '../../redux/baseReduxSlices/authSlice';

const SkeletonArray = () => {
  const skeletons = Array.from({ length: 5 }).map((_, index) => (
    <Skeleton key={index} variant="rectangular" width={210} height={300} />
  ));

  return (
    <Box display="flex" gap={2}>
      {skeletons}
    </Box>
  );
};
export const Favorites = () => {
  const accessToken=useSelector(tokenFromStore)
  const [filterType, setFilterType] = useState('cheapToExp');

  const [remove,{isSuccess,error,isLoading}]=useRemoveFromWishListMutation()
  const handleChange = (event: SelectChangeEvent) => {
    setFilterType(event.target.value as string);
  };
  let userId: string  = '';
  let email:string=''
  if (accessToken) {
    try {
      const decoded: IJWT = jwtDecode<IJWT>(accessToken);
      userId = decoded?.id;
      email=decoded?.email
    } catch (error) {
      console.error('Ошибка декодирования токена:', error);
      userId = ''; // Если токен некорректен
    }
  }
  const {data:favoriteList,error:errorFavorite,isLoading:isFavoritesLoading}=useGetWishListProductsQuery(userId||'',{skip:!userId})
  const {data:cartData,isLoading:isCartLoading,error:cartError}=useGetCartQuery(userId||'',{skip:!userId})
  const [addToCart,{error:addCartError,isSuccess:isAddCartSuccess}]=useAddToCartMutation();

  const filteredList = useMemo(() => {
    if (!favoriteList) return [];
    const sortedList = [...favoriteList]; // создаем копию списка для сортировки
    if (filterType === 'cheapToExp') {
      sortedList.sort((a, b) => a.product.price - b.product.price);
    } else if (filterType === 'expToCheap') {
      sortedList.sort((a, b) => b.product.price - a.product.price);
    }
    return sortedList;
  }, [favoriteList, filterType]);

  useEffect(()=>{
    console.log(filteredList);
    console.log(filterType)
  },[filterType])




  return (
    <Box
    sx={{
      width: '100%',
      maxWidth: '1200px', // Ограничение максимальной ширины
      margin: '0 auto',   // Центрирование контейнера
      display: 'flex',
      flexDirection: 'column',
      minHeight: '90vh',
      padding: '5px',
    }}
  >
        <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}
        sx={{borderRadius:'10px',backgroundColor:'#fff',padding:'7px',minHeight:'50px'}}
        >
        <Typography sx={{fontSize:'18px'}}>Favorites</Typography>
        <Box sx={{minWidth:'120px'}}>
        <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">{filterType}</InputLabel>
        <Select
         labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filterType}
        onChange={handleChange}
        defaultValue='cheapToExp'
        >
        <MenuItem value={'cheapToExp'}>From cheap to expensive</MenuItem>
        <MenuItem value={'expToCheap'}>From expensive to cheap</MenuItem>
        </Select>
        </FormControl>
        </Box>
        </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: '20px' }}>
          {isFavoritesLoading ? (
            <SkeletonArray />
          ) : (
            filteredList.map((product) =>{

              return <FavoriteItem key={product.product._id}
              product={product}
              userId={userId}
              removeFromWishList={remove}
              addToCart={addToCart}
              removeError={error}
              isRemoveSuccess={isSuccess}
              isAddCartSuccess={isAddCartSuccess}
              addCartError={addCartError}
              />
            })
          )}
        </Box>
            <ToastContainer/>
      </Box>
  )
}
