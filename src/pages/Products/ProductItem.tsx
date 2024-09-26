import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import React from 'react';
import { ITVDetails, ILaptopDetails, IMobileDetails } from '../../types/product.interfaces'; // Импортируйте интерфейсы для детализации продуктов

interface ProductItemProps {
    _id: string;
    brand: string;
    price: number;
    comments: any[];
    description: string;
    image: string;
    model: string;
    purchases: number;
    rating: { average: number; totalRatings: number };
    stock: number;
    views: number;
    productDetails: ITVDetails | ILaptopDetails | IMobileDetails; // Типизируем productDetails
}

export const ProductItem: React.FC<ProductItemProps> = ({
    _id,
    brand,
    price,
    comments,
    description,
    image,
    model,
    purchases,
    rating,
    stock,
    views,
    productDetails,
}) => {
    const renderProductDetails = () => {
        switch (productDetails.type) { // Используем тип из productDetails
            case 'tv':
                return (
                    <Box>
                        <Typography>Screen Size: {productDetails.screenSize}</Typography>
                        <Typography>Resolution: {productDetails.resolution}</Typography>
                        <Typography>Smart TV: {productDetails.smartTV ? 'Yes' : 'No'}</Typography>
                    </Box>
                );
            case 'laptop':
                return (
                    <Box>
                        <Typography>Screen Size: {productDetails.screenSize}</Typography>
                        <Typography>Processor: {productDetails.processor}</Typography>
                        <Typography>RAM: {productDetails.ram}</Typography>
                        <Typography>Storage: {productDetails.storage}</Typography>
                    </Box>
                );
            case 'mobile':
                return (
                    <Box>
                        <Typography>Screen Size: {productDetails.screenSize}</Typography>
                        <Typography>Battery: {productDetails.battery}</Typography>
                        <Typography>Camera: {productDetails.camera}</Typography>
                    </Box>
                );
            default:
                return <Typography>Unknown product type</Typography>;
        }
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={model}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {brand} {model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography>Price: ${price}</Typography>
                <Typography>Stock: {stock}</Typography>
                <Typography>Views: {views}</Typography>
                <Typography>Purchases: {purchases}</Typography>
                <Typography>Rating: {rating.average} ({rating.totalRatings} reviews)</Typography>
                {/* Рендерим детали продукта */}
                {renderProductDetails()}
            </CardContent>
        </Card>
    );
};
