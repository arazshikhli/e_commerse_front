import {memo} from 'react';
import Box from '@mui/material/Box';
import { TVTable } from './TVTable/TVTable';
import { MobileTable } from './MobileTable/MobileTable';
import { Typography } from '@mui/material';

const MemoizedMobileTable = memo(MobileTable);
const MemoizedTVTable = memo(TVTable);
export const AllProducts = () => {

  return (
    <Box sx={{
      width:'100%',
      height:'100%',
      overflow:'hidden',
      textAlign:'center'
    }}>
    <Box sx={{width:'100%',backgroundColor:'#FEDDDF'}}>  <Typography variant='body2' sx={{color:'#430199',marginTop:'20px'}}>Mobile list:</Typography></Box>
    <MemoizedMobileTable/>
    <Box sx={{width:'100%',backgroundColor:'#FEDDDF'}}>  <Typography variant='body2' sx={{color:'#430199',marginTop:'20px'}}>Mobile list:</Typography></Box>
    
    <MemoizedTVTable/>

    </Box>
  )
}
