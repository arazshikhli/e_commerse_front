import React, { useState } from 'react'
import { AuthComponent } from './AuthComponent';
import { Box, Typography } from '@mui/material';
import {useLoginMutation} from '../../redux/rtk/authApi'


export const LoginPage = () => {

  const [email,setEmail]=useState<string>()
  const [password,setPassword]=useState<string>()
  const [login,{error,isLoading}]=useLoginMutation()


  return (
    <Box sx={{ display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      width: '100%', 
      height: '95vh', 
      backgroundColor: '#01C6FD' }}>
            <AuthComponent
            authFn={login}
            authType={'Login'}
            />
    </Box>


  )
}
