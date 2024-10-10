import React, { useState } from 'react'
import { AuthComponent } from './AuthComponent';
import { Box, Typography } from '@mui/material';
import {useReqisterMutation} from '../../redux/rtk/authApi'


export const RegisterPage = () => {

  const [email,setEmail]=useState<string>()
  const [password,setPassword]=useState<string>()
  const [register,{error,isLoading}]=useReqisterMutation()


  return (
    <Box sx={{   display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      width: '100%', 
      height: '95vh', // Сделаем высоту 100% от viewport height
      backgroundColor: '#01C6FD' }}>
           
            <AuthComponent
            authFn={register}
            authType='Register'
            />
    </Box>


  )
}
