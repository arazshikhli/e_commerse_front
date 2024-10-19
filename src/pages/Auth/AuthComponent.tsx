import React, { Dispatch, SyntheticEvent, useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}
interface LoginForm {
  email: string;
  password: string;
}

interface AuthComponentProps {
  authFn: (userData: { name?: string; email: string; password: string }) => Promise<any>;
  authType: string;
  openSnackBar: boolean;
  setOpenSnackBar: Dispatch<React.SetStateAction<boolean>>;
  handleClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ authFn, authType,openSnackBar,setOpenSnackBar }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Динамическая схема валидации
const RegisterSchema = yup.object().shape({
  name:  yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// В компоненте AuthComponent
const { register:LoginRegister, handleSubmit:handleLoginSubmit, formState: { errors:LoginErrors }, reset:LoginReset } = useForm<LoginForm>({
  resolver: yupResolver(LoginSchema), // используйте корректную схему
  mode: 'onChange',
});

const { register:registerRegister, handleSubmit:handleRegisterSubmit, formState: { errors:RegisterErrors }, reset:RegisterReset } = useForm<RegisterForm>({
  resolver: yupResolver(RegisterSchema), // используйте корректную схему
  mode: 'onChange',
});


  const LoginSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await authFn(data);
      if (response && response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
        setOpenSnackBar(true)
        navigate('/');
      }
      LoginReset();
    } catch (err) {
      console.log('Error during login:', err);
    }
  };
  const RegisterSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const response = await authFn(data);
      if (response && response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
        setOpenSnackBar(true)
        navigate('/');
      }
      RegisterReset();
    } catch (err) {
      console.log('Error during login:', err);
    }
  };


  const LoginError: SubmitErrorHandler<LoginForm> = (error) => {
    console.log(error);
  };
  const RegisterError: SubmitErrorHandler<RegisterForm> = (error) => {
    console.log(error);
  };

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
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
      onSubmit={
        authType==='Login'?handleLoginSubmit(LoginSubmit,LoginError):
        handleRegisterSubmit(RegisterSubmit,RegisterError)
      }
    >
      <AccountCircleIcon color="primary"
       sx={{ width: '120px', height: '120px', position: 'absolute', top: '-50px' }} />
      <Typography variant="h3">{location.pathname === '/login' ? 'Login' : 'Registration'}</Typography>

      {location.pathname === '/register' && (
        <TextField
          sx={{ width: '90%' }}
          InputProps={{
            sx: { borderRadius: '50px' },
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          label="Name"
          {...registerRegister('name')}
          error={!!RegisterError.name}
          helperText={RegisterErrors.name?.message}
        />
      )}

      <TextField
        sx={{ width: '90%' }}
        InputProps={{
          sx: { borderRadius: '50px' },
          endAdornment: (
            <InputAdornment position="end">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        label="Email"
        {...LoginRegister('email')}
        error={authType==='Login'? !!LoginError.name:!!RegisterError.name }
        helperText={authType==='Login'?LoginErrors.email?.message:RegisterErrors.email?.message}
      />

      <TextField
        sx={{ width: '90%' }}
        type={isShowPassword ? 'text' : 'password'}
        InputProps={{
          sx: { borderRadius: '50px' },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {isShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        {...LoginRegister('password')}
        error={authType==='Login'?!!LoginErrors.password:!!RegisterErrors.password}
        helperText={authType==='Login'?LoginErrors.password?.message:RegisterErrors.password?.message}
      />

      <Button sx={{ width: '90%', borderRadius: '50px' }} type="submit" variant="contained">
        {authType}
      </Button>

      <NavLink to={location.pathname === '/register' ? '/login' : '/register'}>
        <Typography variant="h6" color='blue'>
          {location.pathname === '/register' ? 'Have an account?' : 'Create Account'}
        </Typography>
      </NavLink>
    </Box>
  );
};
