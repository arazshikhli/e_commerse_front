import React, { Dispatch, FC, SyntheticEvent, useState } from 'react'
import { AuthComponent } from './AuthComponent';
import { Box, Typography } from '@mui/material';
import {useLoginMutation} from '../../redux/rtk/authApi'

interface LoginPageProps {
  openSnackBar: boolean;
  setOpenSnackBar: Dispatch<React.SetStateAction<boolean>>;
  handleClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

export const LoginPage:FC<LoginPageProps>= ({openSnackBar,setOpenSnackBar,handleClose}) => {

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
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            handleClose={handleClose}
            />
    </Box>


  )
}
