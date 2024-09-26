import React, { useState } from 'react';
import { useGetAllProductsQuery } from '../../redux/rtk/productsRTK';
import { IProduct, IProductResponse } from '../../types/product.interfaces';
import { ProductItem } from './ProductItem';
import { Grid2, Pagination } from '@mui/material';

export const ProductList = () => {
    const [page, setPage] = useState(1);
    const limit = 10; 
    const { data, isLoading, error } = useGetAllProductsQuery({ page, limit });

    console.log(data); // For debugging purposes

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred</div>;
    }

    // Handle page change
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value); // Update the current page
    };

    return (
        <div>
            <Grid2
                container
                spacing={2}
                sx={{
                    width: '100%',
                    gridTemplateRows: 'repeat(4, 1fr)',
                    backgroundColor: 'yellow',
                }}
            >
                {data?.products.map((product: IProduct) => (
                    <ProductItem
                        key={product._id} // Corrected access to product's _id
                        {...product} 
                    />
                ))}
            </Grid2>
            <Pagination
                count={data?.totalPages} // Total pages from the response
                page={page} // Current page state
                onChange={handleChange} // Update page on change
                sx={{ marginTop: 2 }} // Optional styling
            />
        </div>
    );
};
