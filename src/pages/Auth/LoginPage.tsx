import React, { useState } from 'react'
import { AuthComponent } from './AuthComponent';
import { Box, Typography } from '@mui/material';
import {useLoginMutation} from '../../redux/rtk/authRTK'


export const LoginPage = () => {

  const [email,setEmail]=useState<string>()
  const [password,setPassword]=useState<string>()
  const [login,{error,isLoading}]=useLoginMutation()


  return (
    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%',alignItems:'center'}}>
            <Typography variant='h3' sx={{marginBottom:'20px'}}> Login </Typography>
            <AuthComponent
            authFn={login}
            buttonType={'Login'}
            />
    </Box>


  )
}
