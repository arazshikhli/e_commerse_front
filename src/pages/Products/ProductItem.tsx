import { useState } from 'react';
import { Card,Fade, Backdrop,
      CardActions, CardContent, CardHeader, CardMedia, IconButton, Modal, Typography,Box,Grid2,
     TextField,
     Button} from '@mui/material';
import React, { FC } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useSelector } from 'react-redux';
import { isauth,usermail } from '../../redux/baseReduxSlices/authSlice';
import {useAddCommentMutation,useLazyGetCommentsQuery}from '../../redux/rtk/productsApi';
import {ProductProps} from '../../types/product.interfaces'
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const ProductItem:FC<ProductProps> = ({product}) => {
        const [addComment,{isLoading,error}]=useAddCommentMutation()
        const [getProductComments, { data: comments, isFetching: isFetchingComments }] = useLazyGetCommentsQuery(); // Lazy query
    
  
       const isAuth=useSelector(isauth)

      
       const [openModal, setOpenModal] = React.useState(false);
       const handleCommentModalOpen = () => {setOpenModal(true)
        getProductComments({ model: product.model, productType: product.categoryName });

       };
       const handleCloseCommentModal = () => setOpenModal(false);
       const user_mail=useSelector(usermail);
       const [comment,setComment]=useState('')

       const handleAddComment=async()=>{
        console.log("userMAil",user_mail);
        console.log("userMAil",product.categoryName);
        
        if(user_mail&&product.categoryName){
          console.log("model: ",product.model)
          
            await addComment({commentText:comment,model:product.model,user:user_mail,productType:product.categoryName})
           
        }
 
       }

       
    return (
        <Grid2 >
        {/* <Card sx={{ maxWidth: 345, margin: 2,cursor:'pointer' }}>
            <CardHeader
            title={product.model}
            subheader={product.brand}
            />
        <CardMedia
        component={'img'}
        height={'194'}
        image={product.imageURL}
        alt={product.model}
        sx={{
            objectFit:'contain',
            objectPosition:'center'
        }}
        />
        <CardContent>
            <Typography>{product.description}</Typography>
        </CardContent>
        <CardActions>
            <IconButton>
            <ShoppingCartIcon/>
            </IconButton>
            <IconButton onClick={handleCommentModalOpen}>
                <ChatBubbleOutlineOutlinedIcon/>
            </IconButton>
        </CardActions>
        <Modal 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseCommentModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        >
            <Fade in={openModal}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
             

            </Typography>
            <TextField
                 value={comment}
                 onChange={e=>setComment(e.target.value)}
                 multiline
                 maxRows={3}
                 fullWidth
                />
                <Button onClick={handleAddComment}>Send</Button>
                {isFetchingComments ? (
            <Typography>Loading comments...</Typography>
          ) : (
            comments?.map((comment: any, index: number) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  {comment.user.email}: {comment.comment}
                </Typography>
              </Box>
            ))
          )}
          </Box>
        </Fade>
        </Modal>
        </Card> */}
        
        </Grid2>

    );
};
