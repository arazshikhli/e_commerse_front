import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import { RenderedProduct } from '@/types/types';

interface IFeatures{
  product:RenderedProduct
}
export const Features:FC<IFeatures> = ({product}) => {
  return (
   <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>


    <Box sx={{width:'98%',backgroundColor:'#ffffff',borderRadius:'20px  20px 0 0 ',padding:'20px 0 20px 20px',display:'flex',flexDirection:'row',textAlign:'center'}}>
    <Box sx={{flex:1,marginRight:'20px'}}>
        <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between', borderBottom: '1px solid #7777' }}>
            <Typography sx={{color:'#777777'}}>Screen Size</Typography><Typography>{product.screenSize}</Typography>
           </Box>           
        </Box>
    </Box>
   {product.categoryName==='Mobile'&&<>
    <Box sx={{width:'98%',backgroundColor:'#ffffff',borderRadius:'0 0 20px 20px ',padding:'0 20px 20px 20px',display:'flex',flexDirection:'row',textAlign:'center'}}>
           <Box sx={{flex:1,marginRight:'20px'}}>
        <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between', borderBottom: '1px solid #7777',marginBottom:'20px' }}>
            <Typography sx={{color:'#777777'}}>Storage</Typography><Typography>{product.storage}</Typography>
           </Box>
           <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between', borderBottom: '1px solid #7777',marginBottom:'20px' }}>
            <Typography sx={{color:'#777777'}}>RAM</Typography><Typography>{product.ram}</Typography>
           </Box>
           <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between', borderBottom: '1px solid #7777',marginBottom:'20px' }}>
            <Typography sx={{color:'#777777'}}>Operating system</Typography><Typography>{product.operatingSystem}</Typography>
           </Box>
           <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between', borderBottom: '1px solid #7777',marginBottom:'20px' }}>
            <Typography sx={{color:'#777777'}}>Network type</Typography><Typography>{product.network}</Typography>
           </Box>
           
        </Box>
        <Box sx={{flex:1}}>
        <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between', borderBottom: '1px solid #7777',marginBottom:'20px' }}>
            <Typography sx={{color:'#777777'}}>Battery</Typography><Typography>{product.battery}</Typography>
           </Box>
           <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between', borderBottom: '1px solid #7777',marginBottom:'20px' }}>
            <Typography sx={{color:'#777777'}}>Battery Capacity</Typography><Typography>{product.batteryCapacity}</Typography>
           </Box>
           <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between', borderBottom: '1px solid #7777',marginBottom:'20px' }}>
            <Typography sx={{color:'#777777'}}>Display Type</Typography><Typography>{product.displayType}</Typography>
           </Box>
        </Box>
        </Box>
   </>}
   </Box>
  )
}


