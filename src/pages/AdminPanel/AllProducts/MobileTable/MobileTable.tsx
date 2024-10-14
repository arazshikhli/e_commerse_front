import React,{useEffect,useState,memo, useMemo} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useGetProductsByCategoryQuery, useDeleteProductsMutation } from '../../../../redux/rtk/productsApi';
import { RenderedProduct } from '@/types/types';

const Row = memo((props: { 
  row: RenderedProduct; 
  selected: boolean; 
  onSelect: (id: string, checked: boolean) => void; 
}) => {
  const { row, selected, onSelect } = props;
  const [open, setOpen] = React.useState(false);

  // Обработчик изменения чекбокса
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onSelect(row._id || '', event.target.checked);
  };

  // Обработчик клика на строку
  const handleRowClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={handleRowClick}>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{marginLeft:'10px',padding:'3px'}}
            checked={selected}
            onChange={handleCheckboxChange} // Используем новый обработчик
            inputProps={{ 'aria-label': 'select row' }}
            onClick={(e) => e.stopPropagation()} 
          />
        </TableCell>
        <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.model}
        </TableCell>
        <TableCell align="right">{row.brand}</TableCell>
        <TableCell align="right">{row.screenSize}</TableCell>
        <TableCell align="right">{row.ram}</TableCell>
        <TableCell align="right">{row.processor}</TableCell>
        <TableCell align="right">{row.storage}</TableCell>
        <TableCell align="right">{row.battery}</TableCell>
        <TableCell align="right">{row.batteryCapacity}</TableCell>
        <TableCell align="right">{row.weight}</TableCell>
        <TableCell align="right">{row.network}</TableCell>
        <TableCell align="right">{row.stock}</TableCell>
        <TableCell align="right">{row.price} $</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography variant="body2">
                {row.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
})

export const MobileTable = () => {
  const { data, isLoading, error } = useGetProductsByCategoryQuery('Mobile');
  const [deleteProduct] = useDeleteProductsMutation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const displayedData = useMemo(() => {
    return data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  useEffect(()=>{
    console.log("data",data)
  },[data]);
  useEffect(()=>{
    console.log("displayed",displayedData)
  },[data,displayedData]);
  
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
    await  deleteProduct(selectedIds); // Удаляем выбранные продукты
    setSelectedIds([]); // Сбрасываем выбранные элементы после удаления
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data.</Typography>;

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteSelected}
        disabled={selectedIds.length === 0}
        sx={{ mb: 2 }} // Добавляем отступ
      >
        Удалить выбранные
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Model</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Screen Size</TableCell>
              <TableCell align="right">RAM</TableCell>
              <TableCell align="right">Processor</TableCell>
              <TableCell align="right">Storage</TableCell>
              <TableCell align="right">Battery</TableCell>
              <TableCell align="right">Battery Capacity</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Network</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              displayedData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mobile: RenderedProduct) => {
                 console.log(mobile);
                    return <Row
                    key={mobile._id}
                    row={mobile}
                    selected={selectedIds.includes(mobile._id || '')} // Ensure _id is a string
                    onSelect={handleSelect}
                  />
                })
            }
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
    </Box>
  );
};
