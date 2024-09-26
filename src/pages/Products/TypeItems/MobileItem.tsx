import {Box,Card,CardMedia} from '@mui/material'

interface MobileItemProps {
    brand: string;
    model: string;
    price: number;
    description: string;
    stock: number;
    image: string;
    productDetails: {
      screenSize: string;
      battery:string,
      camera:string
    };
  }
  
  export const MobileItem: React.FC<MobileItemProps> = ({
    brand,
    model,
    price,
    description,
    stock,
    image,
    productDetails,
  }) => {
    return (
      <Card>
        <CardMedia component="img" image={image} alt={model} />
        <Box>
          <h2>{brand} - {model}</h2>
          <p>{description}</p>
          <p>Price: {price}</p>
          <p>Stock: {stock}</p>
          <p>Details: {productDetails.screenSize}, {productDetails.camera}, {productDetails.battery}, </p>
        </Box>
      </Card>
    );
  };