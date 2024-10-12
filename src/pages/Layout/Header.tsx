import React,{memo, useEffect, useState,MouseEvent} from 'react';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography, TextField, Container, Menu, Tooltip, Button, Avatar } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../../redux/baseReduxSlices/authSlice'
import { Login, Logout } from '@mui/icons-material';
import {  NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {useGetCartQuery} from '../../redux/rtk/productsApi'
import { jwtDecode } from 'jwt-decode';
import {tokenFromStore,decodeToken} from '../../redux/baseReduxSlices/authSlice';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
interface IHeaderProps {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  cartItemsQuantity:number
}
interface IToken{
  id:string;
  email:string;
  isAdmin:boolean;
}

const pages = ['Products', 'Pricing', 'Blog'];
export const HeaderComponent: React.FC<IHeaderProps> = memo(({ openDrawer, toggleDrawer,cartItemsQuantity }) => {
  const dispatch=useDispatch()
  const accessToken=useSelector(tokenFromStore);
  let userId: string | null = null;
  let email: string | null = null;
  let isAdmin:boolean=false;
  if(accessToken){
    try{
        const decoded: IToken = jwtDecode<IToken>(accessToken); // Decode the token correctly
        console.log(decoded)
        isAdmin = decoded.isAdmin; // Check if the user is an admin
    }
    catch(err){
        console.error('Error decoding token:', err);
    }
}
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event:MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
<AppBar position='static'>
  <Container maxWidth='md'>
    <Toolbar disableGutters>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <NavLink to={'/'}><Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HOME
          </Typography></NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                 size="large"
                 aria-label="account of current user"
                 aria-controls="menu-appbar"
                 aria-haspopup="true"
                 onClick={handleOpenNavMenu}
                 color="inherit"
            >
            </IconButton>
            <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical:'top',
              horizontal:'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{display:{xs:'block',md:'none'}}}
            >
              {
                pages.map((page)=>(
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{textAlign:'center'}}>{page}</Typography>
                  </MenuItem>
                ))
              }
            </Menu>
            </Box>    
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display:'flex',alignItems:'center'}}>
            {
              isAdmin&&(<>
              <Tooltip title="Admin panel">
              <NavLink to={'/adminpanel'}>  <IconButton
              onMouseEnter={()=>handleOpenUserMenu}
              onMouseLeave={()=>handleCloseUserMenu}
              sx={{ p: 0 }}>
                <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
              </IconButton></NavLink>
            </Tooltip>
           
              </>)
            }
          </Box>
        {accessToken&&(
            <Box sx={{marginLeft:'100px'}}>     
            <NavLink style={{marginRight:'10px'}} to={'/cart'}>
                  <ShoppingCartIcon sx={{fontSize:'30px'}}/>
                </NavLink>
                </Box>
        )}
         <Box sx={{marginLeft:'100px'}}>  
               {
                accessToken?(   
                  <IconButton  onClick={handleLogout} sx={{marginLeft:'100px'}} >
                        <Logout sx={{fontSize:'30px'}}/>
                      </IconButton>
                     ):(
                        <NavLink to={'/register'} >
                          <Login/>
                        </NavLink>
                      )
               }
                </Box>
    </Toolbar>

  </Container>

</AppBar>
  );
});


// <Box sx={{ display: 'flex' }}>
// <CssBaseline />
// <AppBar sx={{ backgroundColor: '#DD38C6',margin:'0' }} component="nav" position='static'>
//   <Toolbar sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
//    <NavLink to={'/'}> <Typography>DIGITAL STORE</Typography></NavLink>
//     <IconButton onClick={() => toggleDrawer(!openDrawer)}>
//       {openDrawer ? <CloseIcon /> : <ListIcon />}
//     </IconButton>
//     <TextField
//       sx={{
//         backgroundColor: 'white',
//         border: 'none',
//         borderRadius: '2rem',
//         '& .MuiOutlinedInput-root': {
//           '& fieldset': { borderColor: 'transparent' },
//           '&:hover fieldset': { borderColor: 'transparent' },
//           '&.Mui-focused fieldset': { borderColor: 'transparent' },
//         },
//       }}
//     />
//             {accessToken?<Box><Typography>{email}</Typography>
//             <IconButton onClick={handleLogout}>
//               <Logout/>
//             </IconButton>
//             </Box>:<IconButton><Link to={'/register'}><Login/></Link></IconButton>}
//             <Badge badgeContent={cartCount} color='primary'>
//               <NavLink to={'/cart'}><ShoppingCartIcon/></NavLink>
//             </Badge>
//             <NavLink to={'adminpanel'}>Admin</NavLink>

//   </Toolbar>

// </AppBar>
// </Box>