import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommonType, ICart, RenderedProduct } from '../../types/types';
import { Provider } from 'react-redux';
import {CommentData,ICartQuery} from '../../types/types'

export const productApi=createApi({
    reducerPath:'productApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/admin/'}),
    tagTypes:['Products','Comments','Cart'],
    endpoints:(builder)=>({
        createProduct: builder.mutation({
            query: (newData) => {
              const token=localStorage.getItem('token')
              return {
                url: '/products',
                method: 'POST',
                body: newData, 
                headers: {
                  Authorization: `Bearer ${token}`, 
                },
              };
            },
            invalidatesTags:['Products']
          }),
            getProducts:builder.query({
                query:()=>'/products',
                providesTags:result=>['Products']
            }),
            getProductById: builder.query<RenderedProduct, string>({
              query: (id) => `/products/${id}`,  // Запрос на сервер с параметром id
            }),
            addComment:builder.mutation<void,CommentData>({
                query:({model,...commentData})=>({
                    url:`/${model}/comments`,
                    method:'POST',
                    body: {
                        model,       // Явно передаем model в body
                        ...commentData, // Остальные данные передаем через spread
                      }
                }),
                invalidatesTags:['Comments']
            }),
            getComments:builder.query({
                query:({ model, productType }) => `/comments/${productType}/${model}`,
                providesTags:result=>['Comments']
            }),
            addToCart:builder.mutation<void,ICart>({
              query:(cartItem)=>({
                url:'/cart/add',
                method:"POST",
                body:cartItem
              }),
              invalidatesTags:['Cart']
            }),
            getCart: builder.query<ICartQuery,string>({
              query: (userId) => `/cart/${userId}`, 
              providesTags:['Cart']
              }),
              updateCartItemQuantity:builder.mutation<void, { userId: string; productId: string; productType: string; quantity: number }>({
                query:({ userId, productId, productType, quantity }) => ({
                  url:'/cart/update',
                  method:'PUT',
                  body:{userId,productId,productType,quantity}
                }),
                invalidatesTags:['Cart']
              })
        }),
     
     
    })


    export const {useCreateProductMutation,
      useAddToCartMutation,
      useGetCartQuery,
      useGetProductsQuery,
      useUpdateCartItemQuantityMutation,
      useAddCommentMutation,useLazyGetCommentsQuery,useGetCommentsQuery,useGetProductByIdQuery}=productApi