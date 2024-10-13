import React from 'react';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { Box } from '@mui/material';
import {Routes,Route} from 'react-router-dom'
import { Layout } from './pages/Layout/Layout';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/Auth/LoginPage';
import { ProductsPage } from './pages/Products/ProductsPage';
import { DetailsPage } from './pages/DetailsPage/DetailsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { RequireAdmin } from './helpers/requireAdmin';
import { RequireAuth } from './helpers/RequireAuth';
import {FilteredListPage} from "./pages/FilteredListPage/FilteredListPage";

function App() {
  return (
  
     <Routes>
    <Route path='/' element={<Layout/>}>
    <Route path='/' index element={<HomePage/>}/>
    
    <Route path='/adminpanel/*' element={<RequireAdmin><AdminPanel/></RequireAdmin>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/products' element={<ProductsPage/>}/>
      <Route path='/filtered' element={<FilteredListPage/>}/>
    <Route path='/products/detail/:id' element={<DetailsPage/>}/>
    <Route path='/cart' element={<RequireAuth><CartPage/></RequireAuth>}/>
    </Route>
    </Routes> 

 

  );
}

export default App;
