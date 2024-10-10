import React,{useEffect, useState} from 'react';
import { Box, Paper, TableContainer, Typography,Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button} from '@mui/material';
import { useGetAllUsersQuery } from '../../../redux/rtk/authApi';
import { CommonType, Product } from '../../../types/types';
import { use } from 'i18next';
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {useMakeAdminMutation,useRemoveAdminMutation}from '../../../redux/rtk/authApi'
interface User {
  _id: string;
  password: string;
  name: string;
  email: string;
  cart: CommonType[];
  isAdmin:boolean;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export const Users = () => {
  const [makeAdmin]=useMakeAdminMutation()
  const [removeAdmin]=useRemoveAdminMutation()
  const { data: allUsersData = [], isLoading, error } = useGetAllUsersQuery('');
  const [changeRole,setChangeRole]=useState(false)
  console.log("all users data: ", allUsersData); // Проверить структуру данных

  // Если ответ - объект, извлекаем массив пользователей
  const allUsers = Array.isArray(allUsersData) ? allUsersData : allUsersData.users || [];

  const handleMakeAdmin=async(id:string)=>{
    try {
      await makeAdmin(id).unwrap(); // Отправляем запрос с ID пользователя
      alert('User promoted to admin successfully');
    } catch (error) {
      console.error('Error promoting user to admin:', error);
    }
  }
  const handleRemoveAdmin=async(id:string)=>{
    try {
      await removeAdmin(id).unwrap(); // Отправляем запрос с ID пользователя
      alert('Admin promoted to user successfully');
    } catch (error) {
      console.error('Error promoting user to admin:', error);
    }
  }

  function createData(
    _id: string,
    name: string,
    email: string,
    isAdmin:boolean,
    cart:CommonType[]
  ){
 return {_id,name,email,isAdmin,cart};
  }
// Присваиваем значения из allUsers в массив rows
const rows = allUsers.map((user: User) =>
  createData(user._id, user.name,  user.email, user.isAdmin,user.cart)
);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const handleRoleActive=()=>{
      setChangeRole(true)
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
         <TableContainer sx={{maxHeight:'700px'}} component={Paper} >
        <Table sx={{minWidth:500}} aria-label='customized table'>
        <TableHead>
          <TableRow>
          <StyledTableCell align='left'>id</StyledTableCell>
          <StyledTableCell align='left'>name</StyledTableCell>
          <StyledTableCell align='left'>email</StyledTableCell>
          <StyledTableCell align='left'>Role</StyledTableCell>
          <StyledTableCell align='left' sx={{width:'50%'}}>Cart</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map((row:User)=>{
                console.log(row.isAdmin)
            return <StyledTableRow key={row._id}>
                <StyledTableCell align='left'>{row._id}</StyledTableCell>
                <StyledTableCell align='left'>{row.name}</StyledTableCell>
                <StyledTableCell align='left'>{row.email}</StyledTableCell>
                <StyledTableCell align='left'>{row.isAdmin}</StyledTableCell>
                {/* <StyledTableCell align='left'><IconButton onClick={()=>handleRoleActive()}>
                  <StyledTableCell align='left'>{row.isAdmin}</StyledTableCell></IconButton>
                      {row.isAdmin?'admin':'user'}
                  </StyledTableCell> */}
                <StyledTableCell align='left'>products</StyledTableCell>
              </StyledTableRow>
            })
          }
        </TableBody>
        </Table>
         </TableContainer>

    </Box>
  );
};
