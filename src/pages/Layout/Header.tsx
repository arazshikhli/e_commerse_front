import React,{memo, useEffect, useState} from 'react';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography, TextField } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../../redux/baseReduxSlices/authSlice'
import { Login, Logout } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {useGetCartQuery} from '../../redux/rtk/productsApi'
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';
import {tokenFromStore} from '../../redux/baseReduxSlices/authSlice'
interface IHeaderProps {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  cartItemsQuantity:number
}

export const HeaderComponent: React.FC<IHeaderProps> = memo(({ openDrawer, toggleDrawer,cartItemsQuantity }) => {
  const dispatch=useDispatch()

  const accessToken=useSelector(tokenFromStore);
  let userId: string | null = null;
  let email: string | null = null;
  if (accessToken) {
    try {
      const decoded: any = jwtDecode(accessToken);
      userId = decoded?.id; 
      email=decoded?.email// получаем id пользователя
    } catch (error) {
      console.error('Ошибка декодирования токена:', error);
      userId = null; // Если токен некорректен
    }
  }

  const {data:userCart,error:cartError,isLoading:isCartLoading}=useGetCartQuery(userId||'',{
    skip:!userId
  })
    const [cartCount,setCartCount]=useState(0);
    useEffect(()=>{
      let summ=0
      if(userCart&& userCart?.length>0){
        for(let idx=0;idx<userCart.length;idx++){
         summ+=userCart[idx].quantity
        }
        setCartCount(summ)
      }
    },[userCart])
  // const cartLength=userCart?.items.length
  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: '#DD38C6',margin:'0' }} component="nav" position='static'>
        <Toolbar sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
         <NavLink to={'/'}> <Typography>DIGITAL STORE</Typography></NavLink>
          <IconButton onClick={() => toggleDrawer(!openDrawer)}>
            {openDrawer ? <CloseIcon /> : <ListIcon />}
          </IconButton>
          <TextField
            sx={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '2rem',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: 'transparent' },
              },
            }}
          />
                  {accessToken?<Box><Typography>{email}</Typography>
                  <IconButton onClick={handleLogout}>
                    <Logout/>
                  </IconButton>
                  </Box>:<IconButton><Link to={'/register'}><Login/></Link></IconButton>}
                  <Badge badgeContent={cartCount} color='primary'>
                    <NavLink to={'/cart'}><ShoppingCartIcon/></NavLink>
                  </Badge>
                  <NavLink to={'adminpanel'}>Admin</NavLink>

        </Toolbar>

      </AppBar>
    </Box>
  );
});
