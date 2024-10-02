import React, { FC, useCallback,memo} from 'react';
import { Box, Select, TextField,FormControl,MenuItem,InputLabel, SelectChangeEvent } from '@mui/material';

interface ModelNameProps {
  categoryName: string;
  productData: any; // Передаем данные продукта
  onFormChange: (data: Partial<IProductForm>) => void;
}

interface IProductForm {
  brand: string;
  model: string;
  price: number;
  description: string;
  imageURL: string;
  screenSize?: string;
  ram?: string;
  processor?: string;
  resolution?: string;
  stock?: number;
  storage?:string;
  smartTV?:boolean;
  graphicsCard:string;
}

export const ProductForms: FC<ModelNameProps> =memo( ({ categoryName, productData, onFormChange }) => {
  const [isSmartTv, setIsSmartTv] = React.useState('');
  const handleSmartTVChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setIsSmartTv(value);
  

    onFormChange({ smartTV: value === 'true' }); // Сохраняем как boolean
  };
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (productData[name] !== value) {
        onFormChange({ [name]: value });
      }
    },
    [onFormChange]
  );

  
  console.log(categoryName);
  
  const commonFields = (
    <>
      <TextField
        label="Brand"
        name="brand"
        value={productData.brand}
        onChange={handleChange}
        required
        error={!productData.brand}
        helperText={!productData.brand ? 'Brand is required' : ''}
      />
      <TextField
        label="Model"
        name="model"
        value={productData.model}
        onChange={handleChange}
        required
        error={!productData.model}
        helperText={!productData.model ? 'Model is required' : ''}
      />
      <TextField
        label="Price"
        type="number"
        name="price"
        value={productData.price}
        onChange={handleChange}
        required
        error={productData.price <= 0}
        helperText={productData.price <= 0 ? 'Price must be greater than 0' : ''}
      />
      <TextField
        label="Description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        required
        error={!productData.description}
        helperText={!productData.description ? 'Description is required' : ''}
      />

      <TextField
        label="Image URL"
        name="imageURL"
        value={productData.imageURL}
        onChange={handleChange}
        required
        error={!productData.imageURL}
        helperText={!productData.imageURL ? 'Image URL is required' : ''}
      />
      
         <TextField
        label="Stock"
        name="stock"
        value={productData.stock}
        onChange={handleChange}
        required
        error={!productData.stock}
        helperText={!productData.stock ? 'Stock is required' : ''}
      />
    </>
  );

  if (!categoryName) return null;

  return (
    <Box>
      {commonFields}
      {categoryName === 'Mobile' && (
        <>
          <TextField
            label="Screen Size"
            name="screenSize"
            value={productData.screenSize}
            onChange={handleChange}
            required
            error={productData.screenSize <= 0}
            helperText={productData.screenSize <= 0 ? 'Screen Size is required' : ''}
          />
          <TextField
            label="RAM"
            name="ram"
            value={productData.ram}
            onChange={handleChange}
            required
            error={!productData.ram}
            helperText={!productData.ram ? 'RAM is required' : ''}
          />
          <TextField
            label="Processor"
            name="processor"
            value={productData.processor}
            onChange={handleChange}
            required
            error={!productData.processor}
            helperText={!productData.processor ? 'Processor is required' : ''}
          />
              <TextField
            label="Storage"
            name="storage"
            value={productData.storage}
            onChange={handleChange}
            required
            error={!productData.storage}
            helperText={!productData.storage ? 'Processor is storage' : ''}
          />
        </>
      )}
      {categoryName === 'TV' && (
        <>
          <TextField
            label="Screen Size"
            name="screenSize"
            value={productData.screenSize}
            onChange={handleChange}
            required
            error={productData.screenSize <= 0}
            helperText={productData.screenSize <= 0 ? 'Screen Size is required' : ''}
          />
          <TextField
            label="Resolution"
            name="resolution"
            value={productData.resolution}
            onChange={handleChange}
            required
            error={!productData.resolution}
            helperText={!productData.resolution ? 'Resolution is required' : ''}
          />
          <FormControl sx={{width:'200px'}}>
  <InputLabel id="smart-tv-select-label">Smart TV</InputLabel>
  <Select
    labelId="smart-tv-select-label"
    id="smart-tv-select"
    value={isSmartTv}
    label="Smart TV"
    onChange={handleSmartTVChange}
  >
    <MenuItem value={'true'}>Yes</MenuItem>
    <MenuItem value={'false'}>No</MenuItem>
  </Select>
</FormControl>
        </>
      )}
      {categoryName === 'Laptop' && (
        <>
          <TextField
            label="Screen Size"
            name="screenSize"
            value={productData.screenSize}
            onChange={handleChange}
            required
            error={productData.screenSize <= 0}
            helperText={productData.screenSize <= 0 ? 'Screen Size is required' : ''}
          />
          <TextField
            label="RAM"
            name="ram"
            value={productData.ram}
            onChange={handleChange}
            required
            error={!productData.ram}
            helperText={!productData.ram ? 'RAM is required' : ''}
          />
          <TextField
            label="Processor"
            name="processor"
            value={productData.processor}
            onChange={handleChange}
            required
            error={!productData.processor}
            helperText={!productData.processor ? 'Processor is required' : ''}
          />

<TextField
            label="Storage"
            name="storage"
            value={productData.storage}
            onChange={handleChange}
            required
            error={!productData.storage}
            helperText={!productData.storage ? 'Storage is required' : ''}
          />
          <TextField
            label="Graphicks Card"
            name="graphicsCard"
            value={productData.graphicsCard}
            onChange={handleChange}
            required
            error={!productData.graphicsCard}
            helperText={!productData.graphicsCard ? 'Graphics Card is required' : ''}
          />
        </>
      )}
    </Box>
  );
});
