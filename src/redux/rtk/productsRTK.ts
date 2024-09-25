import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productsRTKApi=createApi({
    reducerPath:'productsRTK',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/admin/'}),
    endpoints:(build)=>({
        getAllProducts:build.query({
            query:()=>`products`
        })
    })
})

export const {useGetAllProductsQuery}=productsRTKApi