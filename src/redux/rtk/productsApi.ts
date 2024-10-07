import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommonType, ICart, RenderedProduct } from '../../types/product.interfaces';
import { Provider } from 'react-redux';
interface CommentData{
    model:string;
    user:string;
    commentText:string;
    productType:string
}
interface IMobile {
    brand: string;
    model: string;
    price: number;
    description: string;
    screenSize: string;
    ram: string;
    processor: string;
    storage: string;
    imageURL: string;
    stock?: number;
    categoryName:string,
    _di:string
  }
  
  interface ILaptop {
    brand: string;
    model: string;
    price: number;
    description: string;
    screenSize: string;
    ram: string;
    processor: string;
    storage: string;
    graphicsCard: string;
    imageURL: string;
    stock?: number;
    categoryName?:string
    comments?:[],
    _di:string
  }
  
  type Product = IMobile | ILaptop;
  
  interface ProductsProps {
    allProducts: Product[];
  }
  interface ICartItem{
    _id:string;
    productType:string;
  productId:RenderedProduct;
  quantity:number
  }
  
  interface ICartQuery{
  user:string,
  _id:string;
  items:ICartItem[]
  }

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