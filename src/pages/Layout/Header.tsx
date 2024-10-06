import React,{memo} from 'react';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography, TextField } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector,useDispatch } from 'react-redux';
import {clearToken, isauth,usermail} from '../../redux/baseReduxSlices/authSlice'
import { Login, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
interface IHeaderProps {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

export const HeaderComponent: React.FC<IHeaderProps> = memo(({ openDrawer, toggleDrawer }) => {
  const dispatch=useDispatch()
  const isAuth=useSelector(isauth)
  const email=useSelector(usermail)
  const handleLogout=()=>{
    dispatch(clearToken())
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: '#DD38C6',margin:'0' }} component="nav" position='static'>
        <Toolbar sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>DIGITAL STORE</Typography>
          <IconButton onClick={() => toggleDrawer(!openDrawer)}>
            {openDrawer ? <CloseIcon /> : <ListIcon />}
          </IconButton>
          <TextField
            sx={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '2rem',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: 'transparent' },
              },
            }}
          />
                  {isAuth?<Box><Typography>{email}</Typography>
                  <IconButton onClick={handleLogout}>
                    <Logout/>
                  </IconButton>
                  </Box>:<IconButton><Link to={'/auth'}><Login/></Link></IconButton>}
        </Toolbar>

      </AppBar>
    </Box>
  );
});
