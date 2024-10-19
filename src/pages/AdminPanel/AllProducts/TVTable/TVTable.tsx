import React, { useEffect, useState, memo, useMemo } from 'react';
import {Box,Collapse,IconButton,Paper,
  Table,TableBody,TableCell,TableContainer,
  TableHead,TablePagination,TableRow,
  Typography,Checkbox,Button,TextField,
  Alert, AlertTitle, CircularProgress,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useGetProductsByCategoryQuery, useDeleteProductsMutation, useUpdateTVMutation } from '../../../../redux/rtk/productsApi';
import { RenderedProduct } from '../../../../types/types';

 
const Row = memo((props: { 
  row: RenderedProduct; 
  selected: boolean; 
  onSelect: (id: string, checked: boolean) => void;
  onSave: (id: string, updatedProduct: RenderedProduct) => void; // Для сохранения изменений
}) => {
  const { row, selected, onSelect, onSave } = props;
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false); // Добавляем состояние для редактирования
  const [editedProduct, setEditedProduct] = React.useState(row); // Добавляем состояние для изменяемых данных продукта

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onSelect(row._id || '', event.target.checked);
  };

  const handleRowClick = () => {
    setOpen(!open);
  };

  const handleProductEdit = () => {
    setIsEditing(true); // Активируем режим редактирования
  };

  const handleInputChange = (field: keyof RenderedProduct, value: string | number) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (row._id) {
      onSave(row._id, editedProduct); // Передаем измененный продукт для сохранения
      setIsEditing(false); // Отключаем режим редактирования
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={handleRowClick}>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ marginLeft: '10px', padding: '3px' }}
            checked={selected}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'select row' }}
            onClick={(e) => e.stopPropagation()} 
          />
        </TableCell>
        {isEditing ? (
          <>
            <TableCell component="th" scope="row">
              <TextField
                value={editedProduct.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.screenSize}
                onChange={(e) => handleInputChange('screenSize', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.ram}
                onChange={(e) => handleInputChange('ram', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.processor}
                onChange={(e) => handleInputChange('processor', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.storage}
                onChange={(e) => handleInputChange('storage', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.battery}
                onChange={(e) => handleInputChange('battery', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.batteryCapacity}
                onChange={(e) => handleInputChange('batteryCapacity', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.network}
                onChange={(e) => handleInputChange('network', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                value={editedProduct.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell component="th" scope="row">
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              {row.model}
            </TableCell>
            <TableCell align="right">{row.brand}</TableCell>
            <TableCell align="right">{row.screenSize}</TableCell>
            <TableCell align="right">{row.resolution}</TableCell>
            <TableCell align="right">{row.smartTV?'YES':"NO"}</TableCell>
            <TableCell align="right">{row.stock}</TableCell>
            <TableCell align="right">{row.price} $</TableCell>
            <TableCell align="right">
              <Button variant="contained" onClick={handleProductEdit}>
                Edit
              </Button>
            </TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 ,display:'flex',flexDirection:'row'}}>
              <Box sx={{flex:2}}><Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography variant="body2">{row.description}</Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row',flex:1,justifyContent:'space-around'}}>
                {row&&row.imageURL.map((image:string,index)=>{
                  return <img key={index} src={image}
                  style={{
                    width:'100px',
                    height:'100px',
                  }}
                  />
                })}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
});

export const TVTable = () => {
  const { data, isLoading, error } = useGetProductsByCategoryQuery('TV');
  const [deleteProduct] = useDeleteProductsMutation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [updateTV,{error:updateError,isSuccess:isUpdateSuccess}]=useUpdateTVMutation()
  const [showAlert, setShowAlert] = useState(false)
  console.log("TVs",data);
  
  const displayedData = useMemo(() => {
    return data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    await deleteProduct(selectedIds);
    setSelectedIds([]);
  };

  useEffect(()=>{
 console.log(   "showAlert",showAlert);
 
  },[showAlert])

  const handleSaveProduct = async(id: string, updatedProduct: RenderedProduct) => {
    // Логика для сохранения измененного продукта
    console.log('Saving product', id, updatedProduct);
    // Тут можно вызвать API для сохранения данных
    await updateTV({id:id,tv:updatedProduct})
    if(isUpdateSuccess){
      console.log('updated');
      setShowAlert(true)
      console.log(showAlert)
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' ,
      backgroundColor:'rgb(154, 111, 247)'
    }}>
      {
        showAlert&&isUpdateSuccess&&(<Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Product has been added successfully!
        </Alert>)
      }
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Model</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Screen Size</TableCell>
              <TableCell align="right">Resolution</TableCell>
              <TableCell align="right">SmartTV</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData?.map((row) => (
              <Row
                key={row._id}
                row={row}
                selected={selectedIds.includes(row._id || '')}
                onSelect={handleSelect}
                onSave={handleSaveProduct} // Передаем функцию сохранения
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedIds.length > 0 && (
        <Box sx={{ padding: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </Box>
      )}
    </Paper>
  );
};
