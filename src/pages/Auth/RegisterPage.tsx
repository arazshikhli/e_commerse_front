import React, { useState } from 'react'
import { AuthComponent } from './AuthComponent';
import { Box, Typography } from '@mui/material';
import {useReqisterMutation} from '../../redux/rtk/authApi'


export const RegisterPage = () => {

  const [email,setEmail]=useState<string>()
  const [password,setPassword]=useState<string>()
  const [register,{error,isLoading}]=useReqisterMutation()


  return (
    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%',alignItems:'center'}}>
            <Typography variant='h3' sx={{marginBottom:'20px'}}> Registration </Typography>
            <AuthComponent
            authFn={register}
            buttonType='Register'
            />
    </Box>


  )
}
