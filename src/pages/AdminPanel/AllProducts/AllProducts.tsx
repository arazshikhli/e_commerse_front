import * as React from 'react';
import Box from '@mui/material/Box';
import { TVTable } from './TVTable/TVTable';
import { MobileTable } from './MobileTable/MobileTable';

export const AllProducts = () => {

  return (
    <Box sx={{
      width:'100%',
      height:'100%',
      overflow:'hidden'
    }}>
  
    <TVTable/>
    <MobileTable/>

    </Box>
  )
}
