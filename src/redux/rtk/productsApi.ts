import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAddCommentQuery,
  ICart,
  IGetCommentQuery,
  IGetRating,
  IRatingQuery,
  IWishAdd,
  IWishList,
  IWishListQuery,
  RenderedProduct,
} from '@/types/types';
import { CommentData, ICartQuery, CartProducts } from '@/types/types';
import { produce } from 'immer';
import { RootState } from '../store';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_BASE_SERVER_URL_ADMIN ||
      'http://localhost:5000/api/admin/',
  }),
  tagTypes: ['Products', 'Comments', 'Cart', 'View', 'WishLists', 'Rating'],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (newData) => {
        const token = localStorage.getItem('accessToken');
        console.log('token');

        return {
          url: '/products',
          method: 'POST',
          body: newData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Products'],
    }),
    getProducts: builder.query({
      query: () => '/products',
      providesTags: (result) => ['Products'],
    }),
    getProductById: builder.query<RenderedProduct, string>({
      query: (id) => `/products/${id}`, // Запрос на сервер с параметром id
      providesTags: (result, error, id) => [{ type: 'View', id }],
    }),
    addComment: builder.mutation<void, IAddCommentQuery>({
      query: ({ model, ...commentData }) => ({
        url: `/${model}/comments`,
        method: 'POST',
        body: {
          model, // Явно передаем model в body
          ...commentData, // Остальные данные передаем через spread
        },
      }),
      invalidatesTags: ['Comments'],
    }),
    getComments: builder.query<CommentData, IGetCommentQuery>({
      query: ({ model, productType }) => `/comments/${productType}/${model}`,
      providesTags: (result) => ['Comments'],
    }),
    addToCart: builder.mutation<void, ICart>({
      query: (cartItem) => ({
        url: '/cart/add',
        method: 'POST',
        body: cartItem,
      }),
      invalidatesTags: ['Cart'],
    }),
    getCart: builder.query<ICartQuery[], string>({
      query: (userId) => `/cart/${userId}`,
      providesTags: ['Cart'],
    }),
    getCartProducts: builder.query<CartProducts[], string>({
      query: (userId) => `/carts/${userId}`,
      providesTags: ['Cart'],
    }),
    getProductsByCategory: builder.query<RenderedProduct[], string>({
      query: (category) => `/productsByCategory/${category}`,
      providesTags: ['Products'],
    }),
    addToWishList: builder.mutation<void, IWishAdd>({
      query: (wishListItem) => ({
        url: '/wish/add',
        method: 'POST',
        body: wishListItem,
      }),
      onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log('ab');

        const patchResult = dispatch(
          productApi.util.updateQueryData(
            'addToWishList' as never,
            { ...arg } as never,
            (draft) => {
              return produce(draft, (state: any) => {
                console.log(`state`, state);
                console.log(`draft`, draft);
              });
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
      // Инвалидируем кэш для определенного пользователя или для всех WishLists
      invalidatesTags: ['WishLists'],
    }),
    removeFromWishList: builder.mutation({
      query: ({ userId, productId, productType }) => ({
        url: `/wishproducts/${userId}`,
        method: 'DELETE',
        body: { productId, productType },
      }),
      invalidatesTags: ['WishLists'],
    }),
    getWishListProducts: builder.query<IWishList[], string>({
      query: (userId) => `/wishproducts/${userId}`,
      providesTags: ['WishLists'],
    }),
    getWishList: builder.query<IWishListQuery[], string>({
      query: (userId) => `/wish/${userId}`,
      providesTags: (result) => ['WishLists'],
    }),
    updateCartItemQuantity: builder.mutation<
      void,
      {
        userId: string;
        productId: string;
        productType: string;
        quantity: number;
      }
    >({
      query: ({ productId, productType, quantity, userId }) => ({
        url: '/cart/update',
        method: 'PUT',
        body: { productId, productType, quantity, userId },
      }),
      invalidatesTags: ['Cart'],
    }),
    updateProductViews: builder.mutation<
      { views: number },
      { id: string; category: string }
    >({
      query: ({ id, category }) => ({
        url: `/${id}/view`,
        method: 'POST',
        body: { id, category }, // Передаем id и category в теле запроса
      }),
      invalidatesTags: ['View'],
    }),
    deleteProducts: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: `products`,
        method: 'DELETE',
        body: { ids }, // Передаем массив ID в теле запроса
      }),
      invalidatesTags: ['Products'], // Убедитесь, что используете корректные теги
    }),
    updateMobile: builder.mutation({
      query: ({ id, mobile }) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `products/mobile/${id}`,
          method: 'PUT',
          body: mobile,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Products'],
    }),
    updateTV: builder.mutation({
      query: ({ id, tv }) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `products/tv/${id}`,
          method: 'PUT',
          body: tv,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['Products'],
    }),
    updateRating: builder.mutation<RenderedProduct, IRatingQuery>({
      query: ({ productId, rating, categoryName }) => ({
        url: `/products/rating/${productId}`,
        method: 'POST',
        body: { rating, categoryName },
      }),
      invalidatesTags: ['Rating'],
    }),
    getAverageRating: builder.query<void, IGetRating>({
      query: ({ productId, categoryName }) =>
        `/products/rating/${productId}?categoryName=${categoryName}`,
      providesTags: ['Rating'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useAddToCartMutation,
  useGetCartQuery,
  useGetProductsQuery,
  useUpdateCartItemQuantityMutation,
  useGetCartProductsQuery,
  useGetProductsByCategoryQuery,
  useAddCommentMutation,
  useLazyGetCommentsQuery,
  useGetCommentsQuery,
  useGetProductByIdQuery,
  useDeleteProductsMutation,
  useUpdateProductViewsMutation,
  useUpdateMobileMutation,
  useUpdateTVMutation,
  useGetWishListProductsQuery,
  useGetWishListQuery,
  useAddToWishListMutation,
  useRemoveFromWishListMutation,
  useGetAverageRatingQuery,
  useUpdateRatingMutation,
} = productApi;
