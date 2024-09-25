import React from 'react'
import {Iproduct} from '../../types/product.interfaces';
import {Card,CardContent,CardMedia, Grid2, Typography} from '@mui/material'

interface productProps extends Iproduct{}

export const ProductItem = ({
  id,
  model,
  brand,
  description,
  price,
  image,
  stock,
  views,
  purchases,
  productDetails
}:productProps) => {
  return (
    <Grid2 spacing={2}>
      <Card
    sx={{maxWidth:300}}
    >
        <CardMedia
        component='img'
        alt={model}
        height={120}
        image={image}
        />
        <CardContent>
          <Typography variant='h5'>{model} </Typography>
          <Typography variant='h3'>{brand} </Typography>
          <Typography>{description}</Typography>
        </CardContent>

    </Card>
    </Grid2>
  )
}
