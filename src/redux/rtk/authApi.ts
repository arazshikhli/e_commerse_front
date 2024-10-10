import {BaseQueryFn, createApi,FetchArgs,fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import { logout, setAccessToken } from '../baseReduxSlices/authSlice';


// Функция для обновления токена
const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch('/users/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  localStorage.setItem('accessToken', data.accessToken);
  return data.accessToken;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/', // Укажите ваш URL
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const newAccessToken = await refreshAccessToken(refreshToken);
        localStorage.setItem('accessToken', newAccessToken);
        api.dispatch(setAccessToken(newAccessToken));

        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        api.dispatch(logout());
      }
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      api.dispatch(logout());
    }
  }

  return result;
};


export const authApi = createApi({
  reducerPath: 'authRTK',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    reqister: builder.mutation({
      query: (userData) => {
        console.log(userData);
        
        return ({
          url: 'users/register',
          method: 'POST',
          body: userData,
          credentials:'include'
        })
      },
      invalidatesTags: ['Users'],
    }),

    login: builder.mutation({
      query: (credentials) => {
        console.log(credentials)
        return ({
          url: 'users/login',
          method: 'POST',
          body: credentials,
        })
      }
        
    }),

    getAllUsers: builder.query({
      query: () => '/users/users',
      providesTags: (result) => ['Users'],
    }),

    makeAdmin: builder.mutation({
      query: (id: string) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `users/${id}/make-admin`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`, // Добавляем токен в заголовок Authorization
          },
        };
      },
      invalidatesTags: ['Users'],
    }),

    removeAdmin: builder.mutation({
      query: (id: string) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: `users/${id}/remove-admin`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`, // Добавляем токен в заголовок Authorization
          },
        };
      },
      invalidatesTags: ['Users'],
    }),

    getProtectedData: builder.query({
      query: () => '/protected-data',
    }),
  }),
});

export const {
  useLoginMutation,
  useMakeAdminMutation,
  useReqisterMutation,
  useGetAllUsersQuery,
  useRemoveAdminMutation,
} = authApi;