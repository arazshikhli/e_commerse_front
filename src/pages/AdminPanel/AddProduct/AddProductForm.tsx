import React, { useState, useCallback, useEffect, memo } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useCreateProductMutation } from '../../../redux/rtk/productsApi';
import { SelectProductModel } from './SelectModelForm';
import { ProductForms } from './ProductForms';
import Snackbar from '@mui/material/Snackbar';
import Alert,{AlertColor} from '@mui/material/Alert';

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
}

export const AddProductForm = memo(() => {
  const [selectedModel, setSelectedModel] = useState<string>('TV');
  const [createProduct, { isLoading, error,isSuccess }] = useCreateProductMutation();
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor; 
  }>({ open: false, message: '', severity: 'success' });

  // Обработка результата запроса
  useEffect(() => {
    if (isSuccess) {
      setNotification({ open: true, message: 'Продукт успешно создан!', severity: 'success' });
    }

    if (error) {
      setNotification({ open: true, message: 'Произошла ошибка: ' + error, severity: 'error' });
    }
  }, [isSuccess, error]);

  // Закрытие уведомления
  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };
  const [productData, setProductData] = useState<IProductForm>({
    brand: '',
    model: '',
    price: 0,
    description: '',
    imageURL: '',
    screenSize: '',
    ram: '',
    processor: '',
    resolution: '',
    storage:''
  // Устанавливаем начальное значение для выбранной модели
  });

  const handleModelSelect = useCallback((modelName: string) => {
    setSelectedModel(modelName);
    setProductData((prevData) => ({
      ...prevData,
      categoryName:modelName
    }));
  }, []);

  useEffect(()=>{
    console.log(error);
    
  },[error])
  const handleFormChange = (data: Partial<IProductForm>) => {
    setProductData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handleSubmit = async () => {
    console.log(productData);
    // Проверяем, что все необходимые поля заполнены

    try {
      console.log("second",productData);
      
      await createProduct(productData).unwrap();
      console.log('Продукт успешно создан');
      setProductData({
        brand: '',
        model: '',
        price: 0,
        description: '',
        imageURL: '',
        screenSize: '',
        ram: '',
        processor: '',
        resolution: '',
        stock: 0,
        storage:''  // Сохраняем текущую модель
      });
      setNotification({ open: true, message: 'Продукт успешно создан!', severity: 'success' });
    } catch (error) {
      console.error('Ошибка при создании продукта:', error);
       // Обработка ошибки
    setNotification({ open: true, message: 'Произошла ошибка: ' + error, severity: 'error' });
    }
  };

  return (
    <Box>
      <SelectProductModel onModelSelect={handleModelSelect} />
      <Box>
        <ProductForms categoryName={selectedModel} onFormChange={handleFormChange} productData={productData} />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Create Product'}
        </Button>
           {/* Ваша форма для создания продукта */}
{/* Уведомление */}
<Snackbar open={notification.open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
    {notification.message}
  </Alert>
</Snackbar>
      </Box>
    </Box>
  );
});
