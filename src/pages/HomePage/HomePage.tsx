import React from 'react'
import { Box } from '@mui/material'
import { ProductsPage } from '../Products/ProductsPage'
export const HomePage = () => {

  return (
    <Box sx={{
      display:'flex',
      flexDirection:'row'
    }}>
      <Box flex={1}> </Box>
      <Box flex={4}><ProductsPage/> </Box>
      <Box flex={1}> </Box>
    </Box>
  )
}
