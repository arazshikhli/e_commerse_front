import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  List,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { RenderedProduct } from '../../types/types';
import { useGetProductsQuery } from '../../redux/rtk/productsApi';
import { NavLink, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SelectedList } from './SelectedList/SelectedList';
import { useDebounce } from '../../helpers/useDebounce';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Card from '@mui/joy/Card';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.level1,
  }),
}));
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
  const {
    data: aAllProducts,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery('');
  const navigate = useNavigate();
  const [value, setValue] = React.useState<number>(0);
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 500);
  const [results, setResults] = useState<string[]>([]);
  const [currentMobilePage, setCurrentMobilePage] = useState(1);
  const [itemsPerMobilePage] = useState(8);
  const [currentTVPage, setCurrentTVPage] = useState(1);
  const [itemsPerTVPage] = useState(8);
  const [hoverCategory, setHoverCategory] = useState('');
  const [currentLaptopPage, setCurrentLaptopPage] = useState(1);
  const [itemsPerLaptopPage] = useState(8);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleMouseEnter = (category: string) => {
    setHoverCategory(category);
  };
  const memoizedFilteredProducts = useMemo(() => {
    return aAllProducts?.filter((product: RenderedProduct) =>
      product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, aAllProducts]);

  const filteredByMobileCategory = useMemo(() => {
    return memoizedFilteredProducts?.filter(
      (product: RenderedProduct) => product.categoryName === 'Mobile'
    );
  }, [memoizedFilteredProducts]);

  const filteredByTVCategory = useMemo(() => {
    return memoizedFilteredProducts?.filter(
      (product: RenderedProduct) => product.categoryName === 'TV'
    );
  }, [memoizedFilteredProducts]);

  const filteredByLaptopCategory = useMemo(() => {
    return memoizedFilteredProducts?.filter(
      (product: RenderedProduct) => product.categoryName === 'Laptop'
    );
  }, [memoizedFilteredProducts]);

  useEffect(() => {}, [memoizedFilteredProducts]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleMoveDetails = (id: string) => {
    navigate(`/products/detail/${id}`);
  };
  const handleNavigateToFiltered = () => {
    navigate('/filtered', { state: { memoizedFilteredProducts } });
  };

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
  const currentMobiles = MobileList?.slice(
    indexOfFirstMobile,
    indexOfLastMobile
  );

  const indexOfLastTV = currentTVPage * itemsPerTVPage;
  const indexOfFirstTV = indexOfLastTV - itemsPerTVPage;
  const currentTVs = TVList?.slice(indexOfFirstTV, indexOfLastTV);

  const indexOfLastLaptop = currentLaptopPage * itemsPerLaptopPage;
  const indexOfFirstLaptop = indexOfLastLaptop - itemsPerLaptopPage;
  const currentLaptops = LaptopList?.slice(
    indexOfFirstLaptop,
    indexOfLastLaptop
  );

  const handleMobilePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentMobilePage(page);
  };
  const handleTVPageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentTVPage(page);
  };
  const handleLaptopPageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentLaptopPage(page);
  };
  if (isProductsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (productsError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
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
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <TextField
            sx={{ width: '500px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="search"
          />
          {debouncedSearchTerm && memoizedFilteredProducts?.length > 0 && (
            <Paper
              sx={{
                position: 'absolute',
                width: '100%',
                zIndex: 1000,
                marginTop: '5px',
              }}
            >
              <List>
                <Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Box sx={{ width: '40%' }}>
                      <Typography
                        onMouseEnter={() => handleMouseEnter('Mobile')}
                      >
                        Mobile
                      </Typography>
                      <Typography onMouseEnter={() => handleMouseEnter('TV')}>
                        TV
                      </Typography>
                      <Typography
                        onMouseEnter={() => handleMouseEnter('Laptop')}
                      >
                        Laptop
                      </Typography>
                    </Box>
                    <Grid
                      container
                      direction="row"
                      spacing={2}
                      sx={{ width: '70%' }}
                    >
                      {hoverCategory === 'Mobile' ? (
                        <>
                          {filteredByMobileCategory &&
                            filteredByMobileCategory
                              .slice(0, 6)
                              .map((mobile: RenderedProduct) => {
                                return (
                                  <Grid
                                    onClick={() => {
                                      if (mobile._id) {
                                        handleMoveDetails(mobile._id);
                                      }
                                    }}
                                    sx={{ width: '30%', cursor: 'pointer' }}
                                  >
                                    <Card sx={{ marginRight: '10px' }}>
                                      <CardCover>
                                        <img
                                          src={mobile.imageURL[0]}
                                          srcSet={mobile.imageURL[0]}
                                          style={{
                                            objectFit: 'contain',
                                            objectPosition: 'center',
                                            width: '100%',
                                            height: '100%',
                                          }}
                                        />
                                      </CardCover>
                                      <CardContent>
                                        <Typography
                                          sx={{
                                            fontSize: '10px',
                                            color: 'red',
                                          }}
                                        >
                                          {mobile.model}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                );
                              })}
                        </>
                      ) : (
                        <>
                          {hoverCategory === 'TV' ? (
                            <Box>
                              {filteredByTVCategory &&
                                filteredByTVCategory.map(
                                  (tv: RenderedProduct) => {
                                    return <Typography>{tv.model}</Typography>;
                                  }
                                )}
                            </Box>
                          ) : (
                            <Box>
                              <Typography>no laptops</Typography>
                            </Box>
                          )}
                        </>
                      )}
                    </Grid>
                  </Box>
                  <Button
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={handleNavigateToFiltered}
                  >
                    Details <KeyboardDoubleArrowRightIcon />
                  </Button>
                </Box>
              </List>
            </Paper>
          )}
        </Box>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="custom tabs example"
          variant="fullWidth"
        >
          <Tab label="Mobiles" />
          <Tab label="TVs" />
          <Tab label="Laptops" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <SelectedList productList={currentMobiles} />
          <Stack spacing={2} sx={{ marginTop: '40px' }}>
            <Pagination
              count={Math.ceil((MobileList?.length || 0) / itemsPerMobilePage)}
              page={currentMobilePage}
              onChange={handleMobilePageChange}
            />
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SelectedList productList={currentTVs} />
          <Stack spacing={2} sx={{ marginTop: '40px' }}>
            <Pagination
              count={Math.ceil((TVList?.length || 0) / itemsPerTVPage)}
              page={currentTVPage}
              onChange={handleTVPageChange}
            />
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SelectedList productList={currentLaptops} />
          <Stack spacing={2} sx={{ marginTop: '40px' }}>
            <Pagination
              count={Math.ceil((LaptopList?.length || 0) / itemsPerLaptopPage)}
              page={currentLaptopPage}
              onChange={handleLaptopPageChange}
            />
          </Stack>
        </TabPanel>
      </Box>
    </Box>
  );
};
