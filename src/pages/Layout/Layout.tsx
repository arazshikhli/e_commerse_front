import React, { useState, useCallback,memo} from 'react';
import { Box, List, ListItem, Typography, Drawer } from '@mui/material';
import { HeaderComponent } from './Header';
import { Outlet } from 'react-router-dom';
import { useGetProductModelsNamesQuery } from '../../redux/rtk/modelsApi';
import './style.css'
import { useGetCartQuery } from '../../redux/rtk/productsApi';
import { useSelector } from 'react-redux';
import {} from '../../redux/baseReduxSlices/authSlice'
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';

interface modelName {
  categoryName: string;
}

export const Layout = memo(() => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: modelsNames } = useGetProductModelsNamesQuery('');
  const [openModal, setOpenModal] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const accessToken=useSelector((state:RootState)=>state.token.accessToken)
  let userId: string | null = null;
  if (accessToken) {
    try {
      const decoded: any = jwtDecode(accessToken);
      userId = decoded?.id; // получаем id пользователя
    } catch (error) {
      console.error('Ошибка декодирования токена:', error);
      userId = null; // Если токен некорректен
    }
  }

  const {data:Cart,error:cartError,isLoading:isCartLoading}=useGetCartQuery(userId||'',{
    skip:!userId
  })


  const cartItemsQuantity=5;

  const toggleDrawer = useCallback((newOpen: boolean) => {
    setOpenDrawer(newOpen);
  }, []);
  const handleMouseEnter = (modelName: string) => {
    setHoveredModel(modelName);
    setOpenModal(true);
  };

  const handleMouseLeave = () => {
    setOpenModal(false);
    setHoveredModel(null);
  };
  const DrawerList = React.memo(() => (
    <Box
      sx={{ width: 250, backgroundColor: '#DD38C6', height: '100%', color: 'white' }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {modelsNames?.map((model: modelName) => (
          <ListItem key={model.categoryName}>
            <Typography >{model.categoryName}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  ));

  return (

    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      // width: '100vw',
      overflow: 'hidden',
    }}
  >
    <HeaderComponent openDrawer={openDrawer} toggleDrawer={toggleDrawer} cartItemsQuantity={cartItemsQuantity} />

    {/* Контентная часть с flex-grow: 1 для растягивания */}
    <Box sx={{ flexGrow:1, width: '100%' ,overflowX:'hidden'}}>
      <Outlet />
      <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
        <DrawerList />
      </Drawer>
    </Box>

    {/* Футер */}
    <footer className='footer' style={{ backgroundColor: '#DD38C6', padding: '20px', textAlign: 'center' }}>
      Footer
    </footer>
  </Box>

  );
});
