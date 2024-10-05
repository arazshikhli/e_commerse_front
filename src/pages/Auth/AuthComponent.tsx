import React, { useEffect, useState,Dispatch, SetStateAction} from 'react'
import {Box, Button, IconButton, InputAdornment, TextField, Typography} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {setToken} from '../../redux/baseReduxSlices/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

const formStyle={
display:'flex',
width:'600px',
flexDirection:'column',
gap:2,
}
interface myForm {
  name?:string|undefined;
  email:string|undefined;
  password:string|undefined
}

interface AuthComponentProps {
  authFn:(userData: {name:string, email: string; password: string }) => Promise<any>,
  buttonType:string
}
 enum AuthEnum{
  Login='LOGIN',
  Register="REGISTER"

 }

export const AuthComponent:React.FC<AuthComponentProps> = ({authFn,buttonType}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const isAuthenticated=useSelector((state:RootState)=>state.token.isAuth)
  const isAdministrator=useSelector((state:RootState)=>state.token.isAdmin)
  const [authType,setAuthType]=useState(AuthEnum.Login)
  const [isShowPassword,setIsShowPassword]=useState(false)
  const location=useLocation()
  const {t}=useTranslation()
  const {register,
    handleSubmit,
    reset,
    formState:{errors,dirtyFields}
  }=useForm<myForm>({
    mode:'onChange'
  })
    

    
  const submit: SubmitHandler<myForm> = async (data) => {
    const { name, email, password } = data;
  
    if (email && password && name) {
      try {
        const response = await authFn({ name, email, password });
  
        const token = response.data?.token;
          console.log("response.da\\",response.data);
          
  
        if (typeof token === 'string') {
          const decodedToken: any = jwtDecode(token); 
          const { id, isAdmin } = decodedToken;
          dispatch(setToken({ token, isAdmin, email }));
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('email', JSON.stringify(email));
          localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        } else {
          console.error("Token is missing or not a string.");
        }
  
      } catch (err) {
        console.log("Error during login:", err);
      }
    }
  
    reset({ email: '', name: '', password: '' });
  
    if (isAuthenticated) {
      navigate('/');
    }
  };
  const error:SubmitErrorHandler<myForm>=data=>{
    console.log(data);
    
  }
  const eMailError=errors['email']?.message;
  const passwordError=errors['password']?.message;

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <Box component='form'
    sx={{display:'flex',
      position:'relative',
      width:'500px',
      flexDirection:'column',
      backgroundColor:'#F9FAFB',
      justifyContent:"center",
      alignItems:'center',
      borderRadius:'2em',
      padding:'2em',
      height:'500px',
      gap:2}}
    onSubmit={handleSubmit(submit,error)}
    >
     <AccountCircleIcon color='primary'
      sx={{width:'120px',height:'120px',
      position:'absolute',
      top:'-50px'
      }}/>
      <Typography variant='h3' sx={{color:'#B0B0B0'}}>{location.pathname==='/login'?'Login':'Registration'}</Typography>
      {
        location.pathname==='/register'&&   <TextField
        sx={{width:'90%'}}
        InputProps={{
          sx:{
            borderRadius:'50px'
          },
          endAdornment:(
            <InputAdornment position='end'>
              <PersonIcon/>
            </InputAdornment>
          )
        }}
        label='Name' 
        {...register('name',{required:true})}/>
      }

      <TextField
      InputProps={{
        sx:{
          borderRadius:'50px'
        },
        endAdornment:(
         <InputAdornment position='end'>
           <EmailIcon/>
         </InputAdornment>
        )
      }}
      sx={{width:'90%',borderRadius:'5em'}}
           color={eMailError?'error':'primary'}
      label={eMailError?eMailError:'Email'}
      {...register('email', {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })}
       aria-invalid={errors.email?true:false}
       />

      <TextField 
      
      sx={{width:'90%',borderRadius:'5em'}}
      color={passwordError?'error':'primary'}
      type={isShowPassword?'text':'password'}
       label={passwordError?passwordError:'Password'}
        {...register('password',{required:true})} 
        InputProps={{
          sx:{borderRadius:'50px'},
          endAdornment:(
            <InputAdornment position='end'>
              <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              >
                {isShowPassword?<VisibilityIcon/>:<VisibilityOffIcon/>}
              </IconButton>
            </InputAdornment>
          )
        }}
       />
       {eMailError&& <Typography>{eMailError}</Typography>}
      <Button
      sx={{
        width:'90%',
        borderRadius:'5em',
        height:'50px'
      }}
      type='submit' variant='contained'>{buttonType} </Button>
      <NavLink to={location.pathname==='/register'?'/login':'/register'}
      
      ><Typography 
      variant='h6' sx={{color:'#B0B0B0'}}>{location.pathname==='/register'?'Have an account?':'Create Account'}</Typography></NavLink>
    </Box>
  )
}
