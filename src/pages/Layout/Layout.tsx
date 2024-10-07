import React, { useState, useCallback,memo, useMemo} from 'react';
import { Box, List, ListItem, Typography, Drawer } from '@mui/material';
import { HeaderComponent } from './Header';
import { Outlet } from 'react-router-dom';
import { useGetProductModelsNamesQuery } from '../../redux/rtk/modelsApi';
import {useTransition} from '@react-spring/web'
import './style.css'
import { useGetCartQuery } from '../../redux/rtk/productsApi';
import { useSelector } from 'react-redux';
import {userID} from '../../redux/baseReduxSlices/authSlice'
interface modelName {
  categoryName: string;
}

export const Layout = memo(() => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: modelsNames } = useGetProductModelsNamesQuery('');
  const [openModal, setOpenModal] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const user_id=useSelector(userID)
  const {data:Cart,error:cartError,isLoading:isCartLoading}=useGetCartQuery(user_id)

  console.log(Cart);
  
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
    <div  className='wrapper'>
      <HeaderComponent openDrawer={openDrawer} toggleDrawer={toggleDrawer} cartItemsQuantity={cartItemsQuantity}/>
      <div className='main'>
      <Outlet />
        <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
          <DrawerList />
        </Drawer>
      </div>
      <footer className='footer'>Footer</footer>
    </div>
  );
});
