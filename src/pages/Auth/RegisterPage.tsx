import React, { useState } from 'react'
import { AuthComponent } from './AuthComponent';
import { Box, Typography } from '@mui/material';
import {useReqisterMutation} from '../../redux/rtk/authApi'


export const RegisterPage = () => {

  const [email,setEmail]=useState<string>()
  const [password,setPassword]=useState<string>()
  const [register,{error,isLoading}]=useReqisterMutation()


  return (
    <Box sx={{display:'flex',justifyContent:'center',
      height:'100%',flexDirection:'column',width:'100%',
      alignItems:'center',backgroundColor:'#01C6FD'}}>
            <AuthComponent
            authFn={register}
            buttonType='Register'
            />
    </Box>


  )
}
