import React from 'react';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { Box } from '@mui/material';
import {Routes,Route} from 'react-router-dom'
import { Layout } from './pages/Layout/Layout';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/Auth/LoginPage';
import { ProductsPage } from './pages/Products/ProductsPage';


function App() {
  return (
  <Box 
  sx={{width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    minHeight:'100vh'
  }}
  >
    <Routes>
    <Route path='/' element={<Layout/>}>
    <Route path='/' index element={<HomePage/>}/>
    <Route path='/adminpanel' element={<AdminPanel/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/products' element={<ProductsPage/>}/>
    </Route>
    </Routes>
  </Box>
 

  );
}

export default App;
