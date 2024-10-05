import React, { useState, useCallback } from 'react';
import { Box, List, ListItem, Typography, Drawer } from '@mui/material';
import { HeaderComponent } from './Header';
import { Outlet } from 'react-router-dom';
import { useGetProductModelsNamesQuery } from '../../redux/rtk/modelsApi';
import {useTransition} from '@react-spring/web'
import './style.css'
interface modelName {
  categoryName: string;
}

export const Layout = React.memo(() => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: modelsNames } = useGetProductModelsNamesQuery('');
  const [openModal, setOpenModal] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);


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
      <HeaderComponent openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      <div className='main'>
      <Outlet />
        <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
          <DrawerList />
        </Drawer>
      </div>
      <footer style={{minHeight:"60px",backgroundColor:'#FDA5A5', textAlign:'center'}}>Footer</footer>
    </div>
  );
});
