import { Box, Card, CardMedia, Skeleton } from '@mui/material'
import React, { FC ,memo} from 'react'
import { RenderedProduct } from '../../types/types'
interface ImagesComponentProps{
    product:RenderedProduct|undefined;
    images:string[]|undefined;
    handleThumbnailClick:(imageUrl: string)=>void;
    currentImage:string|undefined
}
export const DetailImagesComponent:FC<ImagesComponentProps> = memo(({product,images,handleThumbnailClick,currentImage}) => {



  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', 
    padding: '20px', width:'48%',height:'90%',justifyContent:'center',
    alignItems:'center', backgroundColor:'#ffff',  borderRadius:'20px'}}>
    {/* Левый блок с миниатюрами */}
    <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
      {images&& images.map((image, index) => (
        <Card key={index} sx={{ marginBottom: '10px', border: '1px solid transparent', transition: 'border 0.3s ease', '&:hover': { border: '1px solid red' } }}>
          <CardMedia
           component="img" image={image} width={100} height={100}
           onClick={() => handleThumbnailClick(image)} 
           alt={`Image ${index + 1}`} />
        </Card>
      ))}
    </Box>

    {/* Главный блок с большим изображением */}
    <Box sx={{ flex: 1, padding: '20px', borderRadius: '8px' }}>
      {
        currentImage?(<Card>   <CardMedia
          component="img"
          image={currentImage} 
          width={500} height={500}
          
          alt={product?.model}
        sx={{objectFit:"contain"}}
        /></Card>
    ):(<Skeleton    sx={{ bgcolor: 'grey.700' }}
      variant="rectangular"

      height={400} />)
      }
    </Box>
  </Box>
  )
})
