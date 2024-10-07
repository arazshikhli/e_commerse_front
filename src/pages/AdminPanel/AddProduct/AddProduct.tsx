import React, { useEffect,useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, IconButton, Alert, AlertTitle, CircularProgress, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreateProductMutation } from '../../../redux/rtk/productsApi';
import { convertImageToBase64 } from '../../../helpers/ConvertImages';
import { FileObject } from '../../../types/types';
import { v4 as uuidv4, v4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import { Close } from '@mui/icons-material';
import { CommonType } from '../../../types/types';

export const AddProduct = () => {
  const { handleSubmit, watch, register, setValue, reset,formState: { errors } } = useForm<CommonType>({
    mode: 'onChange'
  });
  const [createProduct, { isLoading, error:addProductError, isSuccess }] = useCreateProductMutation();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); 
  const [showAlert, setShowAlert] = useState(false); // Состояние для показа уведомления


  const submit = async (data: CommonType) => {
    try {
      const base64Images = await convertImageToBase64(data.images);
      const newData = { ...data, images: base64Images };
      await createProduct(newData);
      
      if (isSuccess) {
        reset(); // Сбрасываем форму
        setShowAlert(true); // Показываем уведомление
        setTimeout(() => setShowAlert(false), 3000);
        setImagePreviews([]) // Убираем уведомление через 3 секунды
      }
    } catch (err) {
      console.error("Error Converting images to Base64: ", err);
    }
  };
  const category = watch('categoryName');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImage: FileObject = {
        originFileObj: file,
        name: file.name,
        lastModified: file.lastModified,
        lastModifiedDate: new Date(),
        size: file.size.toString(),
        uid: uuidv4()
      };
      const currentImages = watch('images') || [];
      setValue('images', [...currentImages, newImage]);

      // Конвертируем файл в base64 для предпросмотра
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Удаляем из массива base64 картинок
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    // Удаляем из массива файлов в форме
    const currentImages = watch('images') || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue('images', updatedImages);
  };
  return (
    <Box sx={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',
    height:'100%'
    }}>
      <Typography>Add Product</Typography>
      {
        isLoading&& <CircularProgress />
      }
      {showAlert && isSuccess && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Product has been added successfully!
        </Alert>
      )}
      {addProductError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          'Failed to add product. Please try again.
        </Alert>
      )}
      <Box component={'form'}
      sx={{
        width:'80%',
        display:'flex',
        flexDirection:'column',
      
        justifyContent:'space-around',
        padding:'10px',
        borderRadius:'2em'
      }}
      onSubmit={handleSubmit(submit)}>
        <FormControl  sx={{ minWidth: '300px' }} error={!!errors.categoryName}>
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

        <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',gap:'2em'}}>
        <TextField
          label="Brand"
          type="text"
          {...register('brand', { required: 'Brand is required' })}
          error={!!errors.brand}
          helperText={errors.brand?.message}
          sx={{marginTop:'1em',width:'50%'}} 
        />

        <TextField
          label="Model"
          {...register('model', { required: 'Model is required' })}
          error={!!errors.model}
          helperText={errors.model?.message}
          sx={{marginTop:'1em',width:'50%'}} 
        />

        </Box>
        <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',gap:'2em'}}>
        <TextField
          label="Price"
          type='number'
          {...register('price', { required: 'Price is required' })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{marginTop:'1em',width:'50%'}} 
        />

        <TextField
          label="Screen size"
          {...register('screenSize', { required: 'Screen size is required' })}
          error={!!errors.screenSize}
          helperText={errors.screenSize?.message}
          sx={{marginTop:'1em',width:'50%'}} 
        />
        </Box>
        {category === 'TV' && (
          <>
          <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',gap:'2em'}}>
          <TextField
              label='Resolution'
              {...register('resolution', { required: 'Resolution is required' })}
              error={!!errors.resolution}
              helperText={errors.resolution?.message}
              sx={{marginTop:'1em',width:'50%'}} 
            />

            <FormControl sx={{marginTop:'1em',width:'50%'}}  error={!!errors.smartTV}>
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
          </Box>
          
          </>
        )}

        {category === 'Mobile' && (
          <>
              <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',gap:'2em'}}>
              <TextField
              label='RAM'
              {...register('ram', { required: 'RAM is required' })}
              error={!!errors.ram}
              helperText={errors.ram?.message}
              sx={{marginTop:'1em',width:'33.33%'}} 
            />

            <TextField
              label='Processor'
              {...register('processor', { required: 'Processor is required' })}
              error={!!errors.processor}
              helperText={errors.processor?.message}
              sx={{marginTop:'1em',width:'33.33%'}} 
            />

            <TextField
              label='Storage'
              {...register('storage', { required: 'Storage is required' })}
              error={!!errors.storage}
              helperText={errors.storage?.message}
              sx={{marginTop:'1em',width:'33.33%'}} 
            />
              </Box>
            <Box sx={{width:'100%',gap:'2em',display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'20px'}}>
              <TextField sx={{width:'33.33%'}}
              label='Battery'
              {...register('battery',{required:'Battery is required'})}
              error={!!errors.battery}
              helperText={errors.battery?.message}
              />
              <TextField sx={{width:'33.33%'}}
                label='Operating system'
                {...register('operatingSystem',{required:'Operating system is required'})}
                error={!!errors.operatingSystem}
                helperText={errors.operatingSystem?.message}
              />
              <TextField sx={{width:'33.33%'}}
              label='Display Type'
              {...register('displayType',{required:'Display type is required'})}
              error={!!errors.displayType}
              helperText={errors.displayType?.message}
              />
            </Box>
            <Box sx={{width:'100%',gap:'2em',display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'20px'}}>
              <TextField sx={{width:'33.33%'}}
              label='Battery capacity'
              {...register('batteryCapacity',{required:'Battery capacity is required'})}
              error={!!errors.batteryCapacity}
              helperText={errors.batteryCapacity?.message}
              />
              <TextField sx={{width:'33.33%'}}
              label='Weight'
              {...register('weight',{required:'Weight is required'})}
              error={!!errors.weight}
              helperText={errors.weight?.message}
              />
              <TextField sx={{width:'33.33%'}}
              label='Network'
              {...register('network',{required:'Network type is required'})}
              error={!!errors.network}
              helperText={errors.network?.message}
              />
        
            </Box>
            
          </>
        )}

        {category === 'Laptop' && (
          <>
              <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',gap:'2em'}}>
            <TextField
              label='RAM'
              {...register('ram', { required: 'RAM is required' })}
              error={!!errors.ram}
              helperText={errors.ram?.message}
              sx={{marginTop:'1em',width:'50%'}} 
            />

            <TextField
              label='Processor'
              {...register('processor', { required: 'Processor is required' })}
              error={!!errors.processor}
              helperText={errors.processor?.message}
              sx={{marginTop:'1em',width:'50%'}} 
            />
            </Box>
            
            <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',gap:'2em'}}>
            <TextField
              label='Storage'
              {...register('storage', { required: 'Storage is required' })}
              error={!!errors.storage}
              helperText={errors.storage?.message}
              sx={{marginTop:'1em',width:'50%'}} 
            />

            <TextField
              label='Graphics Card'
              {...register('graphicsCard', { required: 'Graphics Card is required' })}
              error={!!errors.graphicsCard}
              helperText={errors.graphicsCard?.message}
              sx={{marginTop:'1em',width:'50%'}} 
            />
            </Box>

           
          </>
        )}
          <TextField
          fullWidth
          multiline
          minRows={3}
          label="Description"
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{marginTop:'1em'}} 
        />
        <Box sx={{
          display:'flex',width:'100%',flexDirection:'row',justifyContent:'center'
        }}>
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
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
  {imagePreviews.map((preview, index) => (
    <Box 
      key={index} 
      sx={{ 
        width: '300px', 
        height: '300px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems:'center', 
        position: 'relative',
        backgroundColor:'gray' // Позиционирование на внешний контейнер
      }}
    >
      <Box 
        sx={{ 
          width: '250px', 
          height: '250px', 
          backgroundImage: `url(${preview})`, 
          backgroundPosition: 'center', 
          backgroundSize: 'cover', 
      
        }} 
      />
      <IconButton onClick={()=>handleRemoveImage(index)} sx={{ position: 'absolute', top: '2px',right:'1px', zIndex: '300' }}>
        <CloseIcon />
      </IconButton>
    </Box>
  ))}
</Box>

        <Button sx={{marginTop:'1em'}} variant='contained' type='submit'>Add Product</Button>
      </Box>
    </Box>
  );
};
