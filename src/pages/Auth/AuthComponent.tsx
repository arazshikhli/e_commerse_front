import React, { useEffect, useState,Dispatch, SetStateAction} from 'react'
import {Box, Button, IconButton, InputAdornment, TextField, Typography} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {setTokens} from '../../redux/baseReduxSlices/authSlice';
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
  authFn:(userData: {name?:string, email: string; password: string }) => Promise<any>,
  authType:string
}


export const AuthComponent:React.FC<AuthComponentProps> = ({authFn,authType}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  // const isAuthenticated=useSelector((state:RootState)=>state.token.isAuth)
  // const isAdministrator=useSelector((state:RootState)=>state.token.isAdmin)

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
    console.log(authType)
    const { name, email, password } = data;
    console.log(name)
    switch(authType){
      case 'Register':{
        if (email && password && name) {
          try {
            const response = await authFn({ name, email, password })   
           
            if (response && response.data.accessToken && response.data.refreshToken) {
              // Сохраняем токены в localStorage
              console.log("refreshToken",response.data.refreshToken)
              localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
              localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
              
              // Устанавливаем токены в Redux store
              dispatch(setTokens({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
              }));
            }
            


          } catch (err) {
            console.log("Error during login:", err);
          }
        }
      
        break;
      }
      case "Login":{
        if (email && password ) {
          try {
            const response = await authFn({  email, password });
            console.log(`email:${email},Password:${password}`);
            
            console.log("log response:",response);
            
              if(response&&response.data.accessToken&&response.data.refreshToken){
                console.log(response.data.accessToken);
                
                dispatch(setTokens({
                  accessToken:response.data.accessToken,
                  refreshToken:response.data.refreshToken
                }))
              }        
      
          } catch (err) {
            console.log("Error during login:", err);
          }
        }
      
        break;
      }
    }
 
    reset({ email: '', name: '', password: '' });
  

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
    sx={{      display: 'flex',
      position: 'relative',
      width: '500px',
      flexDirection: 'column',
      backgroundColor: '#F9FAFB',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '2em',
      padding: '2em',
      height: '500px', // Занимаем всю доступную высоту
      gap: 2}}
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
      type='submit' variant='contained'>{authType} </Button>
      <NavLink to={location.pathname==='/register'?'/login':'/register'}
      
      ><Typography 
      variant='h6' sx={{color:'#B0B0B0'}}>{location.pathname==='/register'?'Have an account?':'Create Account'}</Typography></NavLink>
    </Box>
  )
}
