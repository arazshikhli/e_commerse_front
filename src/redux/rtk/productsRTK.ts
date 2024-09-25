import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Iproduct } from '../../types/product.interfaces'; // Импортируйте ваш интерфейс

export const productsRTKApi = createApi({
    reducerPath: 'productsRTK',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/admin/' }),
    tagTypes: ['Product'],
    endpoints: (build) => ({
        getAllProducts: build.query<Iproduct[], void>({ // Используйте Iproduct
            query: () => `products`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Product' as const, id })),
                          { type: 'Product', id: 'LIST' },
                      ]
                    : [{ type: 'Product', id: 'LIST' }],
        }),
    }),
});

export const { useGetAllProductsQuery } = productsRTKApi;