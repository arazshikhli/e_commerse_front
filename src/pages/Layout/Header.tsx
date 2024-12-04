// import React, { memo, useEffect, useMemo } from 'react';
// import {
//   AppBar,
//   Box,
//   IconButton,
//   Toolbar,
//   Typography,
//   Menu,
//   Tooltip,
//   Avatar,
//   Container,
//   Badge,
// } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout, user } from '../../redux/baseReduxSlices/authSlice';
// import { Favorite, Login, Logout } from '@mui/icons-material';
// import { NavLink } from 'react-router-dom';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { useNavigate } from 'react-router-dom';
// import AdbIcon from '@mui/icons-material/Adb';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import {
//   fetchCart,
//   selectCartItems,
//   selectCartLoading,
// } from '../../redux/baseReduxSlices/cartSlice';
// import { selectWishlistItems } from '../../redux/baseReduxSlices/wishlistSlice';
// import { RootState } from '../../redux/store';
// import { useAppDispatch } from '../../helpers/useAppDispatch';

// export const HeaderComponent = memo(() => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const user_info = useSelector(user);
//   const cartItems = useSelector(selectCartItems);
//   const isLoading = useSelector(selectCartLoading);
//   const wishlistItems = useSelector(selectWishlistItems);
//   const { email, isAdmin, id: userId } = user_info || {};

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchCart(userId));
//     } // Здесь передается userId
//   }, [dispatch, cartItems]);
//   // Подсчет количества товаров в корзине
//   const cartItemsQuantity = useMemo(() => {
//     let quantity = 0;
//     if (cartItems && cartItems.length) {
//       for (let index = 0; index < cartItems.length; index++) {
//         const cartItem = cartItems[index];
//         quantity += cartItem.quantity;
//       }
//     }
//     return quantity;
//   }, [cartItems, fetchCart]);

//   // Подсчет количества товаров в избранном
//   const wishListQuantity = useMemo(() => {
//     return wishlistItems?.length || 0;
//   }, [wishlistItems]);

//   const handleNavigate = () => {
//     navigate('/register');
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   const CartButton = memo(
//     ({ cartItemsQuantity }: { cartItemsQuantity: number }) => (
//       <NavLink to="/cart">
//         <IconButton color="inherit">
//           <Badge badgeContent={cartItemsQuantity} color="success">
//             <ShoppingCartIcon />
//           </Badge>
//         </IconButton>
//       </NavLink>
//     )
//   );

//   const WishListButton = memo(
//     ({ wishListQuantity }: { wishListQuantity: number }) => (
//       <NavLink to="/favorites">
//         <IconButton color="inherit">
//           <Badge badgeContent={wishListQuantity} color="success">
//             <Favorite />
//           </Badge>
//         </IconButton>
//       </NavLink>
//     )
//   );

//   return (
//     <AppBar position="static">
//       <Container maxWidth="lg">
//         <Toolbar
//           disableGutters
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <AdbIcon sx={{ mr: 1 }} />
//             <NavLink to="/">
//               <Typography
//                 variant="h6"
//                 noWrap
//                 sx={{
//                   fontFamily: 'monospace',
//                   fontWeight: 700,
//                   letterSpacing: '.3rem',
//                   color: 'inherit',
//                   textDecoration: 'none',
//                 }}
//               >
//                 HOME
//               </Typography>
//             </NavLink>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             {user_info ? (
//               <>
//                 <CartButton cartItemsQuantity={cartItemsQuantity} />
//                 <WishListButton wishListQuantity={wishListQuantity} />
//               </>
//             ) : null}

//             {isAdmin ? (
//               <Tooltip title="Admin panel">
//                 <NavLink to="/adminpanel">
//                   <IconButton color="inherit">
//                     <AdminPanelSettingsIcon />
//                   </IconButton>
//                 </NavLink>
//               </Tooltip>
//             ) : null}
//             {user_info ? (
//               <IconButton onClick={handleLogout} color="inherit" sx={{ ml: 2 }}>
//                 <Logout />
//               </IconButton>
//             ) : (
//               <IconButton color="inherit" onClick={handleNavigate}>
//                 <Login />
//               </IconButton>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// });

import React, { memo, useEffect, useState, MouseEvent, useMemo } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  Tooltip,
  Avatar,
  Container,
  Badge,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout, user } from '../../redux/baseReduxSlices/authSlice';
import { Favorite, Login, Logout } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  useGetCartProductsQuery,
  useGetCartQuery,
  useGetWishListProductsQuery,
} from '../../redux/rtk/productsApi';
import { jwtDecode } from 'jwt-decode';
import { tokenFromStore } from '../../redux/baseReduxSlices/authSlice';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { IToken } from '../../types/types';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useGetProductModelsNamesQuery } from '../../redux/rtk/modelsApi';
import { selectCartItems } from '../../redux/baseReduxSlices/cartSlice';

export const HeaderComponent = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_info = useSelector(user);
  const carts = useSelector(selectCartItems);
  const { email, isAdmin, id: userId } = user_info || {};
  console.log('carts from redux', carts);
  const {
    data: Cart,
    error: cartError,
    isLoading: isCartLoading,
  } = useGetCartProductsQuery(userId || '', {
    skip: !userId,
  });
  const {
    data: WishList,
    error: wishListError,
    isLoading: isWishListLoading,
  } = useGetWishListProductsQuery(userId || '', { skip: !userId });

  const cartItemsQuantity = useMemo(() => {
    let quantity = 0;
    if (Cart && Cart.length) {
      for (let index = 0; index < Cart.length; index++) {
        const cartItem = Cart[index];
        quantity += cartItem.quantity;
      }
    }
    return quantity;
  }, [Cart]);

  console.log('cart from Redux', carts);
  const wishListQuantity = useMemo(() => {
    return WishList?.length || 0;
  }, [WishList]);

  const handleNavigate = () => {
    navigate('/register');
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  const CartButton = memo(
    ({ cartItemsQuantity }: { cartItemsQuantity: number }) => (
      <NavLink to="/cart">
        <IconButton color="inherit">
          <Badge badgeContent={cartItemsQuantity} color="success">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </NavLink>
    )
  );

  const WishListButton = memo(
    ({ wishListQuantity }: { wishListQuantity: number }) => (
      <NavLink to="/favorites">
        <IconButton color="inherit">
          <Badge badgeContent={wishListQuantity} color="success">
            <Favorite />
          </Badge>
        </IconButton>
      </NavLink>
    )
  );
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AdbIcon sx={{ mr: 1 }} />
            <NavLink to="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                HOME
              </Typography>
            </NavLink>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user_info ? (
              <>
                <CartButton cartItemsQuantity={cartItemsQuantity} />
                <WishListButton wishListQuantity={wishListQuantity} />
              </>
            ) : (
              <></>
            )}

            {isAdmin ? (
              <Tooltip title="Admin panel">
                <NavLink to="/adminpanel">
                  <IconButton color="inherit">
                    <AdminPanelSettingsIcon />
                  </IconButton>
                </NavLink>
              </Tooltip>
            ) : (
              <></>
            )}
            {user_info ? (
              <IconButton onClick={handleLogout} color="inherit" sx={{ ml: 2 }}>
                <Logout />
              </IconButton>
            ) : (
              <IconButton color="inherit" onClick={handleNavigate}>
                <Login />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
