import React from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreateProductMutation } from '../../../redux/rtk/productsApi';
import { convertImageToBase64 } from '../../../helpers/ConvertImages';
import { FileObject } from '../../../types/product.interfaces';
import { v4 as uuidv4, v4 } from 'uuid';



export interface CommonType {
  brand: string;
  model: string;
  price: number;
  description: string;
  screenSize: string;
  categoryName: string;
  images: FileObject[];
  _id?: string;
  comments?: [];
  ram?: string;
  processor?: string;
  storage?: string;
  graphicsCard?: string;
  resolution?: string;
  smartTV?: string;
}

export const AddProduct = () => {
  const { handleSubmit, watch, register, setValue, formState: { errors } } = useForm<CommonType>({
    mode: 'onChange'
  });
  const [createProduct, { isLoading, error, isSuccess }] = useCreateProductMutation();


  const submit = async (data: CommonType) => {
    console.log("DATA: ", data);
   try{
    const base64Images=await convertImageToBase64(data.images);
    const newData={
      ...data,
      images:base64Images
    }
   await createProduct({newData})
   }
   catch(err){
    console.log("Error Converting images to 64Base: ", err);
    
   }
    // Отправляем запрос с formData
  };
  const category = watch('categoryName');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImage: FileObject = {
        originFileObj: file, // Сам файл
        name: file.name,     // Название файла
        lastModified:file.lastModified,
        lastModifiedDate:new Date(),
        size:file.size.toString(),
        uid:uuidv4()
      };
      const currentImages = watch('images') || [];
      setValue('images', [...currentImages, newImage]);
    }
  };

  return (
    <Box>
      <Typography>Add Product</Typography>
      <Box component={'form'} onSubmit={handleSubmit(submit)}>
        <FormControl sx={{ minWidth: '300px' }} error={!!errors.categoryName}>
          <InputLabel>Category</InputLabel>
          <Select
            {...register('categoryName', { required: 'Category is required' })}
            defaultValue="TV"
            label="Category"
            onChange={(e) => setValue('categoryName', e.target.value)}
          >
            <MenuItem value="TV">TV</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
            <MenuItem value="Laptop">Laptop</MenuItem>
          </Select>
          <FormHelperText>{errors.categoryName?.message}</FormHelperText>
        </FormControl>

        <TextField
          label="Brand"
          type="text"
          {...register('brand', { required: 'Brand is required' })}
          error={!!errors.brand}
          helperText={errors.brand?.message}
        />

        <TextField
          label="Model"
          {...register('model', { required: 'Model is required' })}
          error={!!errors.model}
          helperText={errors.model?.message}
        />

        <TextField
          label="Price"
          type='number'
          {...register('price', { required: 'Price is required' })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          multiline
          minRows={3}
          label="Description"
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label="Screen size"
          {...register('screenSize', { required: 'Screen size is required' })}
          error={!!errors.screenSize}
          helperText={errors.screenSize?.message}
        />

        <div>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Upload File
            </Button>
          </label>
        </div>

        {category === 'TV' && (
          <>
            <TextField
              label='Resolution'
              {...register('resolution', { required: 'Resolution is required' })}
              error={!!errors.resolution}
              helperText={errors.resolution?.message}
            />

            <FormControl error={!!errors.smartTV}>
              <InputLabel>Smart TV</InputLabel>
              <Select
                {...register('smartTV', { required: 'Smart TV is required' })}
                defaultValue=""
                label="Smart TV"
                onChange={(e) => setValue('smartTV', e.target.value)}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
              <FormHelperText>{errors.smartTV?.message}</FormHelperText>
            </FormControl>
          </>
        )}

        {category === 'Mobile' && (
          <>
            <TextField
              label='RAM'
              {...register('ram', { required: 'RAM is required' })}
              error={!!errors.ram}
              helperText={errors.ram?.message}
            />

            <TextField
              label='Processor'
              {...register('processor', { required: 'Processor is required' })}
              error={!!errors.processor}
              helperText={errors.processor?.message}
            />

            <TextField
              label='Storage'
              {...register('storage', { required: 'Storage is required' })}
              error={!!errors.storage}
              helperText={errors.storage?.message}
            />
          </>
        )}

        {category === 'Laptop' && (
          <>
            <TextField
              label='RAM'
              {...register('ram', { required: 'RAM is required' })}
              error={!!errors.ram}
              helperText={errors.ram?.message}
            />

            <TextField
              label='Processor'
              {...register('processor', { required: 'Processor is required' })}
              error={!!errors.processor}
              helperText={errors.processor?.message}
            />

            <TextField
              label='Storage'
              {...register('storage', { required: 'Storage is required' })}
              error={!!errors.storage}
              helperText={errors.storage?.message}
            />

            <TextField
              label='Graphics Card'
              {...register('graphicsCard', { required: 'Graphics Card is required' })}
              error={!!errors.graphicsCard}
              helperText={errors.graphicsCard?.message}
            />
          </>
        )}

        <Button type='submit'>Add Product</Button>
      </Box>
    </Box>
  );
};
