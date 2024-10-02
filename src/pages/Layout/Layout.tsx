import React, { useState, useCallback } from 'react';
import { Box, List, ListItem, Typography, Drawer } from '@mui/material';
import { HeaderComponent } from './Header';
import { Outlet } from 'react-router-dom';
import { useGetProductModelsNamesQuery } from '../../redux/rtk/modelsApi';

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

  // Функция для открытия модального окна при наведении
  const handleMouseEnter = (modelName: string) => {
    setHoveredModel(modelName); // Устанавливаем текущее название модели
    setOpenModal(true);
  };

  // Функция для закрытия модального окна при уходе мыши
  const handleMouseLeave = () => {
    setOpenModal(false);
    setHoveredModel(null); // Сбрасываем название модели
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
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <HeaderComponent openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
      <Box sx={{ marginTop: '56px', padding: '10px' }}>
        <Outlet />
        <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
          <DrawerList />
        </Drawer>
      </Box>
      <footer></footer>
    </Box>
  );
});
