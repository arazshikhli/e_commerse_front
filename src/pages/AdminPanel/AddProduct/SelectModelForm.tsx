import React, { FC, memo, useEffect, useState } from 'react';
import { useCreateProductMutation } from '../../../redux/rtk/productsApi';
import { useLazyGetProductModelsNamesQuery } from '../../../redux/rtk/modelsApi';
import { Box, FormControl, Select, InputLabel, MenuItem, FormHelperText, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, useFieldArray,Controller } from 'react-hook-form';

const modelSchema = yup.object().shape({
  modelName: yup.string().required('Выберите модель продукта'),
});

interface ISelectProductModelProps {
  onModelSelect: (modelName: string) => void;
}

interface IFormInput {
  modelName: string;
}

export const SelectProductModel: FC<ISelectProductModelProps> = memo(({ onModelSelect }) => {
  const [trigger, { data: modelNames, error: modelError, isLoading: isModelLoading }] = useLazyGetProductModelsNamesQuery();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue, 
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(modelSchema),
  });

  const selectedModel = watch('modelName');

  useEffect(() => {
    if (selectedModel) {
      onModelSelect(selectedModel);
    }
  }, [selectedModel, onModelSelect]);

  
  useEffect(() => {
    trigger('').then((response) => {
      if (response.data && response.data.length > 0) {
        setValue('modelName', response.data[0].categoryName);
        onModelSelect(response.data[0].categoryName); 
      }
    });
  }, [trigger, setValue, onModelSelect]);

  return (
    <Box component={'form'} onSubmit={handleSubmit((data) => onModelSelect(data.modelName))}>
    
      <FormControl fullWidth error={!!errors.modelName}>
      <InputLabel id="model-name-label">Select category</InputLabel>
       <Controller
          name="modelName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              labelId="model-name-label"
              id="modelName"
              {...field}
              defaultValue=""
              label="Select category"
            >
              {isModelLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : (
                modelNames?.map((model: { categoryName: string }) => (
                  <MenuItem key={model.categoryName} value={model.categoryName}>
                    {model.categoryName}
                  </MenuItem>
                ))
              )}
            </Select>
          )}
        />
        <FormHelperText>{errors.modelName?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
});

{/* <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Comment"
            multiline
            fullWidth
            variant="outlined"
            maxRows={4} // Максимальное количество строк
          />
        )}
      /> */}

     