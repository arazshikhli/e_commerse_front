import React, { useEffect, useMemo, useState } from 'react'
import { Box, CircularProgress,  List,  Pagination,  Paper,  Stack,  TextField,  Typography } from '@mui/material'
import { RenderedProduct} from '../../types/types';
import {useGetProductsQuery} from '../../redux/rtk/productsApi'
import {NavLink, useNavigate} from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SelectedList } from './SelectedList/SelectedList';
import { useDebounce}from '../../helpers/useDebounce'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Card from '@mui/joy/Card';
const CustomComponent: React.FC = () => {
  return <div>Контент вашего компонента</div>;
};


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export const HomePage = () => {
  const {data:aAllProducts,isLoading:isProductsLoading,error:productsError}=useGetProductsQuery('');
  const navigate=useNavigate()
  const [value, setValue] = React.useState<number>(0); // Указываем тип состояния
  const [search,setSearch]=useState('')
  const debouncedSearchTerm=useDebounce(search,500)
  const [results, setResults] = useState<string[]>([]);
  const [currentMobilePage, setCurrentMobilePage] = useState(1);
  const [itemsPerMobilePage] = useState(8); // количество продуктов на странице
  const [currentTVPage, setCurrentTVPage] = useState(1);
  const [itemsPerTVPage] = useState(8); // количество продуктов на странице
  const [hoverCategory,setHoverCategory]=useState('')
  const [currentLaptopPage, setCurrentLaptopPage] = useState(1);
  const [itemsPerLaptopPage] = useState(8); // количество продуктов на странице

  // Обработчик изменения текста поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleMouseEnter = (category: string) => {
    setHoverCategory(category);
  };

  const handleMouseLeave = () => {
    // setHoverCategory('');
  };

  const memoizedFilteredProducts = useMemo(() => {
    return aAllProducts?.filter((product: RenderedProduct) =>
      product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, aAllProducts]);
  
  const filteredByMobileCategory=useMemo(()=>{
    return memoizedFilteredProducts?.filter((product:RenderedProduct)=>
      product.categoryName==='Mobile'
    )
  },[memoizedFilteredProducts])

  const filteredByTVCategory=useMemo(()=>{
    return memoizedFilteredProducts?.filter((product:RenderedProduct)=>
      product.categoryName==='TV'
    )
  },[memoizedFilteredProducts])

  const filteredByLaptopCategory=useMemo(()=>{
    return memoizedFilteredProducts?.filter((product:RenderedProduct)=>
      product.categoryName==='Laptop'
    )
  },[memoizedFilteredProducts])
  
  useEffect(()=>{
    // console.log('mobiles: ',filteredByMobileCategory)
    // console.log('tv: ',filteredByTVCategory)
  },[memoizedFilteredProducts])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  useEffect(()=>{
    // console.log(memoizedFilteredProducts);
    
  },[search])
  const TVList: RenderedProduct[] = [];
  const MobileList: RenderedProduct[] = [];
  const LaptopList: RenderedProduct[] = [];


  aAllProducts?.forEach((item: RenderedProduct) => {
    if (item.categoryName === 'TV') {
      TVList.push(item);
    } else if (item.categoryName === 'Mobile') {
      MobileList.push(item);
    } else if (item.categoryName === 'Laptop') {
      LaptopList.push(item);
    }
  });

const indexOfLastMobile = currentMobilePage * itemsPerMobilePage;
const indexOfFirstMobile = indexOfLastMobile - itemsPerMobilePage;
const currentMobiles = MobileList?.slice(indexOfFirstMobile, indexOfLastMobile);

const indexOfLastTV = currentTVPage * itemsPerTVPage;
const indexOfFirstTV = indexOfLastTV - itemsPerTVPage;
const currentTVs = TVList?.slice(indexOfFirstTV, indexOfLastTV);

const indexOfLastLaptop = currentLaptopPage * itemsPerLaptopPage;
const indexOfFirstLaptop= indexOfLastLaptop - itemsPerLaptopPage;
const currentLaptops= LaptopList?.slice(indexOfFirstLaptop, indexOfLastLaptop);

const handleMobilePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
  setCurrentMobilePage(page);
};
const handleTVPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
  setCurrentTVPage(page);
};
const handleLaptopPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
  setCurrentLaptopPage(page);
};
  if (isProductsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (productsError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Typography variant="h6">Error: </Typography>
      </Box>
    );
  }

  return (
    <Box
    sx={{
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      marginTop: '60px',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', // гарантирует вертикальную центровку
    }}
  >
    <Box sx={{ width: '80%', display: 'flex', justifyContent: 'center', flexDirection: 'column',alignItems:'center' }}>
      <Box sx={{position:'relative'}}>
      <TextField
      sx={{width:'500px'}}
      value={search}
      onChange={e=>setSearch(e.target.value)}
      label='search'
      />
   {debouncedSearchTerm && memoizedFilteredProducts?.length > 0 && (
          <Paper sx={{ position: 'absolute', width: '100%', zIndex: 1000, marginTop: '5px' }}>
            <List><Box>
            <Box sx={{width:'100%',display:'flex',flexDirection:'row'}}>
                  <Box sx={{flex:1}}>
                  <Typography
          onMouseEnter={() => handleMouseEnter('Mobile')}

        >
          Mobile
        </Typography>
        <Typography
          onMouseEnter={() => handleMouseEnter('TV')}
        >
          TV
        </Typography>
        <Typography
          onMouseEnter={() => handleMouseEnter('Laptop')}
        >
          Laptop
        </Typography>
                  </Box>
                  <Box sx={{flex:1}}>
                  <Typography>
          {
            hoverCategory==='Mobile'?(<>
            {
              filteredByMobileCategory&&filteredByMobileCategory.slice(0, 6).map((mobile:RenderedProduct)=>{
                return <Card sx={{minWidth:200,marginRight:'10px'}}>
                  <CardCover >
                    <img src={mobile.imageURL[0]}
                    srcSet={mobile.imageURL[0]}
                     style={{
                      objectFit: 'contain', 
                      objectPosition: 'center', 
                      width: '100%',
                      height: '100%',
                  }}
                    />
                  </CardCover>
                </Card>
              })
            }
            </>):(<>
            {
              hoverCategory==='TV'?(<Box>
                {
                  filteredByTVCategory&&filteredByTVCategory.map((tv:RenderedProduct)=>{
                    return <Typography>{tv.model}</Typography>
                  })
                }
              </Box>):(<Box><Typography>no laptops</Typography></Box>)
            }
            </>)
          }
        </Typography>
                  </Box>
                </Box>
                <NavLink style={{color:'blue'}} to={'/filtered'}>Details <KeyboardDoubleArrowRightIcon/></NavLink>
            </Box>
           
              {/* {memoizedFilteredProducts.map((product: RenderedProduct, index: number) => (
                <Box sx={{width:'100%',display:'flex',flexDirection:'row'}}>
                  <Box sx={{flex:1}}>
                    <Typography>Mobile</Typography>
                    <Typography>TV</Typography>
                    <Typography>Laptop</Typography>
                  </Box>
                  <Box sx={{flex:1}}>
                    
                  </Box>
                </Box>
                // <ListItemButton key={index} onClick={() => navigate(`/products/${product._id}`)}>
                //   <ListItemText primary={product.model} />
                // </ListItemButton>
              ))} */}
            </List>
          </Paper>
        )}
      </Box>
     
      <Tabs value={value} onChange={handleChange} aria-label="custom tabs example" variant="fullWidth">
        <Tab label="Mobiles" />
        <Tab label="TVs" />
        <Tab label="Laptops" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SelectedList productList={currentMobiles} />
        <Stack spacing={2} sx={{marginTop:'40px'}}>
        <Pagination
        count={Math.ceil((MobileList?.length || 0) / itemsPerMobilePage)}
        page={currentMobilePage}
         onChange={handleMobilePageChange}
        />
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <SelectedList productList={currentTVs} />
        <Stack spacing={2} sx={{marginTop:'40px'}}> 
        <Pagination
        count={Math.ceil((TVList?.length || 0) / itemsPerTVPage)}
        page={currentTVPage}
         onChange={handleTVPageChange}
        />
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CustomComponent />
      </TabPanel>
    </Box>
  </Box>
  );};