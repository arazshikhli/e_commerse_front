import React,{memo} from 'react';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography, TextField } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector,useDispatch } from 'react-redux';
import {clearToken, isauth,userID,usermail} from '../../redux/baseReduxSlices/authSlice'
import { Login, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {useGetCartQuery} from '../../redux/rtk/productsApi'
interface IHeaderProps {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  cartItemsQuantity:number
}

export const HeaderComponent: React.FC<IHeaderProps> = memo(({ openDrawer, toggleDrawer,cartItemsQuantity }) => {
  const dispatch=useDispatch()
  const isAuth=useSelector(isauth)
  const email=useSelector(usermail)
  const userId=useSelector(userID)

  const {data:userCart,error:kartError,isLoading:isCartLoading}=useGetCartQuery(userId);
  
  const cartLength=userCart?.items.length
  const handleLogout=()=>{
    dispatch(clearToken())
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: '#DD38C6',margin:'0' }} component="nav" position='static'>
        <Toolbar sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>DIGITAL STORE</Typography>
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
                  {isAuth?<Box><Typography>{email}</Typography>
                  <IconButton onClick={handleLogout}>
                    <Logout/>
                  </IconButton>
                  </Box>:<IconButton><Link to={'/auth'}><Login/></Link></IconButton>}
                  <Badge badgeContent={cartLength} color='primary'>
                  <IconButton>
                    <ShoppingCartIcon/>
                  </IconButton>
                  </Badge>

        </Toolbar>

      </AppBar>
    </Box>
  );
});
