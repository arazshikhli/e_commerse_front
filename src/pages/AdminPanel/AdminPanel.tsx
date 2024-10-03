import React from 'react'
import { AddModelForm } from './AddModelForm'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid2, Typography } from '@mui/material'
import {useGetProductModelsQuery} from '../../redux/rtk/modelsApi'
import {IModel,IModelAttribute} from '../../types/product.interfaces'
import { ArrowDownwardOutlined } from '@mui/icons-material'
import { AddProduct } from './AddProduct/AddProduct'



interface ModelData extends IModel{
  _id:string;
}
interface ModelDataAttributes extends IModelAttribute{
  _id:string
}
export const AdminPanel = () => {
  const {data,isLoading,error} =useGetProductModelsQuery('')
  console.log(data);
  
  return (<Box sx={{
    display:'flex',
    width:'100%',
    flexDirection:'row',
    // minHeight:'900px',
    padding:'10px',
    marginTop:'20px',
    backgroundImage:'url("/gradient.jpg")',
    backgroundPosition:'center',
    backgroundSize:'cover',
    borderRadius:'1em'
  }} >
    <Box sx={{ padding: '10px', margin: '10px',display:'flex',flexDirection:'column',width:'100%' ,alignItems:'center'}}>
  <Typography
  sx={{marginBottom:'10px',color:'#DD38C6',letterSpacing:'2px',fontWeight:'600'}}
  variant='h5'>PRODUCT & CATEGORY ADDING PANEL</Typography>
  <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
  <Box sx={{ marginBottom: '10px' }}>
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardOutlined />} aria-controls='panel1-content'>
        Add Model Form
      </AccordionSummary>
      <AccordionDetails>
        <AddModelForm />
      </AccordionDetails>
    </Accordion>
  </Box>

  <Box >
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardOutlined />} aria-controls='panel2-content'>
        Add Product Form
      </AccordionSummary>
      <AccordionDetails>
    <AddProduct/>
      </AccordionDetails>
    </Accordion>
  </Box>
  </Box>
  
</Box>

            
  </Box>)
}
