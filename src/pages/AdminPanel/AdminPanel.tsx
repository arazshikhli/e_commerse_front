import React from 'react';
import { AddProduct } from './AddProduct/AddProduct';
import { Users } from './Users/Users';
import { AllProducts } from './AllProducts/AllProducts';
import { Statisticks } from './Statistic/Statisticks';
import { Route, Routes, NavLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useTransition, animated } from '@react-spring/web';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import './style.css';

export const AdminPanel = () => {
  const location = useLocation();

  // Анимация перехода между страницами
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
    keys: location.pathname,
  });


  return (
    <Box sx={{ width:'100%',height:'100%', overflow:'hidden'}}>
      <AppBar variant="elevation" position="static">
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <NavLink to="addProduct">
            {({ isActive }) => (
              <Box
                sx={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: isActive ? '#DD38C6' : 'transparent',
                  color: isActive ? 'white' : 'inherit',
                  textDecoration: 'none',
                  display:'flex',
                  flexDirection:'column'
                }}
              >
                <Typography>ADD PRODUCT</Typography>
               {isActive&&<ExpandMoreOutlinedIcon/>}
              </Box>
            )}
          </NavLink>
          <NavLink to="allproducts">
            {({ isActive }) => (
              <Box
                sx={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: isActive ? '#DD38C6' : 'transparent',
                  color: isActive ? 'white' : 'inherit',
                  textDecoration: 'none',
                      display:'flex',
                  flexDirection:'column'
                }}
              >
               <Typography> ALL PRODUCTS</Typography>
                {isActive&&<ExpandMoreOutlinedIcon/>}
              </Box>
            )}
          </NavLink>
          <NavLink to="users">
            {({ isActive }) => (
              <Box
                sx={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: isActive ? '#DD38C6' : 'transparent',
                  color: isActive ? 'white' : 'inherit',
                  textDecoration: 'none',
                      display:'flex',
                  flexDirection:'column'
                }}
              >
                <Typography>USERS</Typography>
                {isActive&&<ExpandMoreOutlinedIcon/>}
              </Box>
            )}
          </NavLink>
          <NavLink to="statistics">
            {({ isActive }) => (
              <Box
                sx={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: isActive ? '#DD38C6' : 'transparent',
                  color: isActive ? 'white' : 'inherit',
                  textDecoration: 'none',
                      display:'flex',
                  flexDirection:'column'
                }}
              >
                <Typography>STATISTICS</Typography>
                {isActive&&<ExpandMoreOutlinedIcon/>}
              </Box>
            )}
          </NavLink>
        </Toolbar>
      </AppBar>


      <Box sx={{
  flex: 1,
  position: 'relative',
  overflow: 'auto',  // Изменяем overflow для правильной прокрутки
  minHeight: '90vh', // Устанавливаем минимальную высоту для контейнера
  display: 'flex', // Используем flex для корректного размещения дочерних элементов
  flexDirection: 'column',
}}>
  {transitions((style, location) => (
    <animated.div style={{ ...style, flexGrow: 1, width: '100%' }}  // Используем flexGrow вместо position: absolute
     className={'animated-page'}>
      <Routes location={location}>
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="users" element={<Users />} />
        <Route path="allproducts" element={<AllProducts />} />
        <Route path="statistics" element={<Statisticks />} />
      </Routes>
    </animated.div>
  ))}
</Box>
    </Box>
  );
};
