import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authRTKSlice=createApi({
    reducerPath:'authRTK',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api'}),
    endpoints:(builder)=>({
        reqister:builder.mutation({
            query:(userData)=>({
                url:'/users/register',
                method:'POST',
                body:userData
            })
        }),

        login:builder.mutation({
            query:(credentials)=>({
                url:'/users/login',
                method:"POST",
                body:credentials
            })
        })
    })
})

export const {useLoginMutation,useReqisterMutation} =authRTKSlice