import { RenderedProduct } from '@/types/types'
import { Box, Button, Rating, TextField, Typography } from '@mui/material'
import React, { FC } from 'react';
import {useAddCommentMutation,useGetCommentsQuery} from '../../redux/rtk/productsApi'
interface CommentProps{
    product:RenderedProduct|undefined
}
export const CommentsComponent:FC<CommentProps> = ({product}) => {

  return (
    <Box sx={{
        width:'100%',
        borderRadius:'20px',
        backgroundColor:'#fff',
        padding:'10px',
        display:'flex',
        flexDirection:'column',
        margin:'20px'
    }}>
        <Box sx={{width:'100%',display:'flex',flexDirection:'column'}}>
            <Box sx={{width:'100%',display:'flex',flexDirection:'row',paddingRight:'20px'}}>
               <Typography sx={{fontSize:'20px',fontWeight:'600'}}>User reviews </Typography>
            <Typography sx={{color:'#777777',fontSize:'20px',fontWeight:'600',marginLeft:'5px'}}>({product?.comments?.length})</Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',alignItems:'flex-end',paddingRight:'20px'}}>
                <Typography>{product?.rating?.totalRatings===0?'5.0':product?.rating?.average}</Typography>
                <Rating name="read-only" value={product?.rating?.totalRatings===0?5:product?.rating?.average} readOnly />
            </Box>
            <Box sx={{width:'100%',display:'flex',flexDirection:'row',height:'50px',paddingRight:'20px'}}>
            <Box sx={{flex:6,height:'100%'}}><TextField sx={{height:'100%'}} fullWidth /></Box>
            <Button sx={{flex:1,
                border:'1px solid black',borderRadius:'10px',height:'100%',margin:'0'
            }}>Write</Button>
            </Box>
        </Box>

    </Box>
  )
}
