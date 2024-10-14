import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, MenuItem, Snackbar } from '@mui/material';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateProductModelMutation } from '../../redux/rtk/modelsApi';

interface Attribute {
  attributeName: string;
  type: string;
}

interface CategoryFormInputs {
  categoryName: string;
  attributes: Attribute[];
}

// Схема валидации с помощью Yup
const categorySchema = yup.object().shape({
  categoryName: yup.string().required('Category name is required').min(3, 'Category name must be at least 3 characters'),
  attributes: yup.array().of(
    yup.object().shape({
      attributeName: yup.string().required('Attribute name is required'),
      type: yup.string().required('Attribute type is required'),
    })
  ).min(1, 'At least one attribute is required'),
});

export const AddModelForm = () => {
  const [attributeTypes] = useState(['String', 'Number', 'Boolean']);
  const [createModel, { isLoading, error }] = useCreateProductModelMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CategoryFormInputs>({
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  const onSubmit: SubmitHandler<CategoryFormInputs> = async (data) => {
    await createModel(data);
    reset();
  };

  const handleAddAttribute = () => {
    append({ attributeName: '', type: 'String' });
  };

  const getErrorMessage = (error: any) => {
    if (error && 'message' in error) {
      return error.message;
    }
    return '';
  };



  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: 400,
        margin: '0 auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Add New Category
      </Typography>

      <TextField
        label="Category Name"
        // defaultValue={'TV'}
        {...register('categoryName')}
        error={!!errors.categoryName}
        helperText={errors.categoryName?.message}
        variant="outlined"
        fullWidth
      />

      <Typography variant="h6" sx={{ mt: 2 }}>
        Attributes
      </Typography>

      {fields.map((field, index) => (
        <Box key={field.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Attribute Name"
            {...register(`attributes.${index}.attributeName`)}
            error={!!errors.attributes?.[index]?.attributeName}
            helperText={errors.attributes?.[index]?.attributeName?.message}
            variant="outlined"
            fullWidth
          />
         <TextField
  select
  label="Type"
  {...register(`attributes.${index}.type`)}
  error={!!errors.attributes?.[index]?.type}
  helperText={
    getErrorMessage(errors.attributes?.[index]?.type)
  }
  variant="outlined"
  fullWidth
>
  {attributeTypes.map((type) => (
    <MenuItem key={type} value={type}>
      {type}
    </MenuItem>
  ))}
</TextField>
          <IconButton onClick={() => remove(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button type="button" onClick={handleAddAttribute} variant="outlined" startIcon={<AddIcon />}>
        Add Attribute
      </Button>

      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Submitting...' : 'Add Category'}
      </Button>
    </Box>
  );
};
