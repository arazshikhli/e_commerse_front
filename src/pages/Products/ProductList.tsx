import { Card, CardMedia, Box, Grid2 } from '@mui/material';
import React from 'react';
import { Iproduct } from '../../types/product.interfaces';
import { useGetAllProductsQuery } from '../../redux/rtk/productsRTK';
import { ProductItem } from './ProductItem';

export const ProductList = () => {
    const { data, isLoading, error } = useGetAllProductsQuery();

    if (isLoading) {
        return <div>Loading...</div>; // Или другой индикатор загрузки
    }

    if (error) {
        return <div>Error:</div>; // Обработка ошибки
    }

    return (
        <Grid2
            container
            spacing={2}
            sx={{
                width: '100%',
                gridTemplateRows: 'repeat(4, 1fr)',
                backgroundColor: 'yellow',
            }}
        >
            {data && data.map((product: Iproduct) => (
                <ProductItem
                    key={product.id}
                    brand={product.brand}
                    description={product.description}
                    id={product.id}
                    image={product.image}
                    model={product.model}
                    price={product.price}
                    productDetails={product.description}
                    purchases={product.purchases}
                    stock={product.stock}
                    views={product.views}
                />
            ))}
        </Grid2>
    );
};
