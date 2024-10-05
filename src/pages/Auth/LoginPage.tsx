import React, { useState } from 'react'
import { AuthComponent } from './AuthComponent';
import { Box, Typography } from '@mui/material';
import {useLoginMutation} from '../../redux/rtk/authApi'


export const LoginPage = () => {

  const [email,setEmail]=useState<string>()
  const [password,setPassword]=useState<string>()
  const [login,{error,isLoading}]=useLoginMutation()


  return (
    <Box sx={{display:'flex',justifyContent:'center',
    height:'100%',flexDirection:'column',width:'100%',
    alignItems:'center',backgroundColor:'#01C6FD'}}>
            <AuthComponent
            authFn={login}
            buttonType={'Login'}
            />
    </Box>


  )
}
