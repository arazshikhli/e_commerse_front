import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const productApi=createApi({
    reducerPath:'productApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/admin'}),
    tagTypes:['Products','Comments'],
    endpoints:(builder)=>({
        createProduct:builder.mutation({
            query:(product)=>({
                url:'/products',
                method:'POST',
                body:product
            }),
            invalidatesTags: ['Products'],
            }),
            getProducts:builder.query({
                query:()=>'/products',
                providesTags:result=>['Products']
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
            })

        }),
     
     
    })


    export const {useCreateProductMutation,useGetProductsQuery,useAddCommentMutation,useLazyGetCommentsQuery,useGetCommentsQuery}=productApi