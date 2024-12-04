import React from 'react';
import { useGetProductModelsQuery } from '../../../redux/rtk/modelsApi';

export const TestPage = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetProductModelsQuery('');
  console.log(categories);
  return <div>TestPage</div>;
};
