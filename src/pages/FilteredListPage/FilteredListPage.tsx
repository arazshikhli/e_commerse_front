import {Box, Paper, Slider, Grid,Typography} from "@mui/material";
import {useLocation} from 'react-router-dom'

import {useState, ChangeEvent, useMemo} from "react";
import {FormComponent} from "./components/FormComponent";
import {RenderedProduct} from "../../types/types";
import {CardItem} from "./components/MiniComponents/CardItem";


function valuetext(value: number) {
    return `${value}$`;
}
export const FilteredListPage=()=>{
    const location = useLocation();
    const memoizedFilteredProducts = location.state?.memoizedFilteredProducts || [];
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const category = event.target.name;
        setSelectedCategories(prevSelected =>
            event.target.checked
                ? [...prevSelected, category]  // Добавляем выбранную категорию
                : prevSelected.filter(item => item !== category)  // Убираем, если сняли галочку
        );
    };

    const handlePriceChange = (event: Event, newPrice: number | number[]) => {
        setPriceRange(newPrice as number[]);
    };
    const filteredByCategory = memoizedFilteredProducts?.filter((product: RenderedProduct) =>
        selectedCategories && selectedCategories.includes(product.categoryName) &&
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    return <Box sx={{width:'100%',display:'flex',height:'100%',alignItems:'center',
        padding:"0 10px",
        flexDirection:'column',justifyContent:'center'}}>
        <Typography> Filtered Products</Typography>
        <Box sx={{position:'relative',width:'100%'}}>

                    <Paper sx={{ width: '100%', zIndex: 1000, marginTop: '5px'}}>
                        <Box width={'300px'}>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                getAriaLabel={() => "Price range"}
                                getAriaValueText={valuetext}
                                min={0}
                                max={2000}
                            />
                        </Box>
                        <FormComponent handleCategoryChange={handleCategoryChange} selectedCategories={selectedCategories}/>
                    </Paper>

        </Box>
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center" // Измените на flex-start, если хотите, чтобы карточки были выровнены слева
            sx={{ flexGrow: 1, width: '100%', padding: '16px' }}
        >
            {filteredByCategory.map((product: RenderedProduct) => (
                <Box key={product._id} sx={{ flex: '0 1 20%', margin: '8px' }}>
                <CardItem key={product._id} product={product}/>
                </Box>
            ))}
        </Box>
    </Box>
}