import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi=createApi({
    reducerPath:'authRTK',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api'}),
    tagTypes:['Users'],
    endpoints:(builder)=>({
        reqister:builder.mutation({
            query:(userData)=>({
                url:'/users/register',
                method:'POST',
                body:userData
            }),
            invalidatesTags:['Users']
        }),

        login:builder.mutation({
            query:(credentials)=>({
                url:'/users/login',
                method:"POST",
                body:credentials
            })
        }),
        getAllUsers:builder.query({
            query:()=>'/users/users',
            providesTags:result=>['Users']
        }),
        makeAdmin: builder.mutation({
            query: (id: string) => {
                const token = localStorage.getItem('token'); 
                console.log("RemoveAdmin",token);
              return {
                url: `/users/${id}/make-admin`,
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`, // Добавляем токен в заголовок Authorization
                },
              };
            },
            invalidatesTags:['Users']
          }),
          removeAdmin: builder.mutation({
            query: (id: string) => {
              const token = localStorage.getItem('token'); 
              console.log("MakeAdmin",token);
              
              return {
                url: `/users/${id}/remove-admin`,
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`, 
                },
              };
            },
            invalidatesTags:['Users']
          }),
          
    })
})

export const {useLoginMutation,useMakeAdminMutation,
    useReqisterMutation,useGetAllUsersQuery,
useRemoveAdminMutation
} =authApi