import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Типы данных для модели продукта
interface ProductModel {
    id: string;
    name: string;
    type: string;
}

interface CreateProductModelRequest {
    name: string;
    type: string;
}

// Типы ответов API
interface ProductModelsResponse {
    models: ProductModel[];
}

// API
export const productModelsApi = createApi({
    reducerPath: 'modelApi',
    tagTypes: ['Models'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/admin/' }),
    endpoints: (builder) => ({
        // Мутация для создания новой модели продукта
        createProductModel: builder.mutation({
            query: (model) => ({
                url: `/models`,
                method: 'POST',
                body: model,
            }),
            invalidatesTags: ['Models'],
        }),
        // Запрос для получения списка моделей продуктов
        getProductModels: builder.query({
            query: () => '/models',
            providesTags: result => ['Models'],
        }),
        getProductModelsNames:builder.query({
            query:()=>'/modelsnames'
        })
    }),
});

// Экспортируем хуки для использования в компонентах
export const { useCreateProductModelMutation, useGetProductModelsQuery,useGetProductModelsNamesQuery,useLazyGetProductModelsQuery,useLazyGetProductModelsNamesQuery } = productModelsApi;
