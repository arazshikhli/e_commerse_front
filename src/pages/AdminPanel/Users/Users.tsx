import React,{useEffect, useState} from 'react';
import { Box, Paper, TableContainer, Typography,Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button} from '@mui/material';
import { useGetAllUsersQuery } from '../../../redux/rtk/authApi';
import { CommonType, CartProducts, RenderedProduct } from '../../../types/types';
import { use } from 'i18next';
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {useMakeAdminMutation,useRemoveAdminMutation}from '../../../redux/rtk/authApi'
import Grid from '@mui/joy/Grid';
import { useGetCartProductsQuery } from '../../../redux/rtk/productsApi';
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
  const {data,isLoading:isCartLoading}=useGetCartProductsQuery('')
  const [changeRole,setChangeRole]=useState(false)
  console.log("all users data: ", allUsersData); // Проверить структуру данных

  const allUsers = Array.isArray(allUsersData) ? allUsersData : allUsersData.users || [];
  const [cartProductsByUser, setCartProductsByUser] = useState<Record<string, CartProducts[]>>({});


  const handleMakeAdmin=async(id:string)=>{
    try {
      await makeAdmin(id).unwrap();
      alert('User promoted to admin successfully');
    } catch (error) {
      console.error('Error promoting user to admin:', error);
    }
  }
  const handleRemoveAdmin=async(id:string)=>{
    try {
      await removeAdmin(id).unwrap();
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

  const UserCart = ({ userId }: { userId: string; }) => {
    const { data: cartProducts = [], isLoading: isCartLoading, error: cartError } = useGetCartProductsQuery(userId);
      console.log("Cart Products",cartProducts);
      console.log('UserID:',userId)
    if (isCartLoading) return <p>Loading cart for {userId}...</p>;
    if (cartError) return <p>Error loading cart for {userId}</p>;

    return (
      <div>
        {cartProducts.length > 0 ? (
          <ul style={{display:'flex',flexDirection:'row', listStyle:'none'}}>
            {cartProducts.map((product) => (
              <li key={product.product._id}>
                <Box sx={{backgroundColor:'#E50038',border:'none',
                color:'#fff',borderRadius:'50px',padding:'8px',margin:'3px'}}>
                  <Typography sx={{fontSize:'12px'}}>{product.product.brand}/{product.product.model}</Typography>
                  <Typography sx={{fontSize:'12px'}}>{product.quantity} piece</Typography>
                </Box>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products in cart</p>
        )}
      </div>
    );
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        alignItems:'',
        overflow:'hidden',
        backgroundColor:'yellow'
      }}
    >
       <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '15%' }}>id</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: '10%' }}>name</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: '10%' }}>email</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: '15%' }}>role</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: '50%' }}>products in cart</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((user: User) => {
              return (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    {user._id}
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.name}</StyledTableCell>
                  <StyledTableCell align="left">{user.email}</StyledTableCell>
                  <StyledTableCell align="left">{user.isAdmin ? 'Admin' : 'User'}</StyledTableCell>
                  <StyledTableCell align="left">
                    {
                      <UserCart userId={user._id} />
                    }
                    {/* {isCartLoading ? 'Loading cart...' : cartProducts.length > 0 ? cartProducts.map((product: RenderedProduct) => (
                      <Typography key={product._id}>{product.name}</Typography>
                    )) : 'No products in cart'} */}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};
