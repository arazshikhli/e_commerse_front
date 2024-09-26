import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IProductResponse } from '../../types/product.interfaces'; 

export const productsRTKApi = createApi({
    reducerPath: 'productsRTK',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/admin/' }),
    tagTypes: ['Product'],
    endpoints: (build) => ({
        getAllProducts: build.query<IProductResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => `products?page=${page}&limit=${limit}`,
            // providesTags: (result) =>
            //     result
            //         ? [
            //               ...result.products.map(({ _id }) => ({ type: 'Product' as const, _id })),
            //               { type: 'Product', id: 'LIST' },
            //           ]
            //         : [{ type: 'Product', id: 'LIST' }],
        }),
    }),
});

export const { useGetAllProductsQuery } = productsRTKApi;