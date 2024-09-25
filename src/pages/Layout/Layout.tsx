import React from 'react'
import { Box } from '@mui/material'
import { HeaderComponent } from './Header'
import { Outlet } from 'react-router-dom'
export const Layout = () => {
  return (
    <Box
    sx={{
        width:'100%',
        minHeight:'100vh'
    }}
    >
        <HeaderComponent/>
        <Box sx={{
            marginTop:'56px',
            padding:'10px'
        }}>
            <Outlet/>
        </Box>
        <footer></footer>
    </Box>
  )
}
