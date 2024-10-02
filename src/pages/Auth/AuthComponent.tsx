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
import { useNavigate } from 'react-router-dom';


const formStyle={
display:'flex',
width:'600px',
flexDirection:'column',
gap:2,
}
interface myForm {
  name:string|undefined;
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

  const {t}=useTranslation()
  const {register,
    handleSubmit,
    reset,
    formState:{errors,dirtyFields}
  }=useForm<myForm>({
    mode:'onChange'
  })


    
  const submit:SubmitHandler<myForm>=async(data)=>{
    const {name,email,password}=data
    if(email&&password&&name){

      try{
        const response=await authFn({name,email,password});

          const decodedToken: any = jwtDecode(response.data.token);
          const { id, isAdmin, } = decodedToken;
          dispatch(setToken({ token: response.data.token, isAdmin,email}));
          localStorage.setItem('token',JSON.stringify(response.data.token))
          localStorage.setItem('email',JSON.stringify(email))
          localStorage.setItem('isAdmin',JSON.stringify(isAdmin))
      }
      catch(err){
        console.log("error during login", err)
      }
    }
    reset({email:'',name:'',password:''})
    if(isAuthenticated){
        navigate('/')
    }
  
  }
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
    sx={formStyle}
    onSubmit={handleSubmit(submit,error)}
    >
      <TextField label='Name' 
      {...register('name',{required:true})}/>

      <TextField
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
      color={passwordError?'error':'primary'}
      type={isShowPassword?'text':'password'}
       label={passwordError?passwordError:'Password'}
        {...register('password',{required:true})} 
        InputProps={{
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
      <Button type='submit' variant='contained'>{buttonType} </Button>
    </Box>
  )
}
