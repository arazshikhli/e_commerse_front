import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import {RenderedProduct} from "@/types/types";
import {FC} from "react";
import {Box} from "@mui/material";

interface ICardProps{
    product:RenderedProduct
}
export const CardItem:FC<ICardProps>=({product})=>{
    return(<Card variant="outlined" sx={{ width: 320 }}>
            <CardOverflow>
                <AspectRatio ratio="2">
                    <img
                        src={product.imageURL[0]}
                        srcSet={product.imageURL[1]}
                        loading="lazy"
                        alt=""
                        style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
             <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Box>
                    <Typography level="title-md">{product.model}</Typography>
                    <Typography level="body-sm">{product.brand}</Typography>
                </Box>
                 <Box>
                     <Typography>{product.price}$</Typography>
                 </Box>
             </Box>
            </CardContent>
            <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                    <Typography
                        level="body-xs"
                        textColor="text.secondary"
                        sx={{ fontWeight: 'md' }}
                    >
                        6.3k views
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography
                        level="body-xs"
                        textColor="text.secondary"
                        sx={{ fontWeight: 'md' }}
                    >
                        1 hour ago
                    </Typography>
                </CardContent>
            </CardOverflow>
        </Card>

    )
}