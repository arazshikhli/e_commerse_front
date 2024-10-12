import {BaseQueryFn, createApi,FetchArgs,fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import { logout, setTokens } from '../baseReduxSlices/authSlice';


// Функция для обновления токена
const refreshAccessToken = async () => {
  const response = await fetch('/users/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
  baseUrl:process.env.REACT_APP_BASE_SERVER_URL||'http://localhost:5000/api/', // Укажите ваш URL
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
    // Если запрос вернул 401 ошибку (истекший accessToken)
    try {
      const newAccessToken = await refreshAccessToken();
      api.dispatch(setTokens(newAccessToken));

      // Повторяем запрос с новым accessToken
      result = await baseQuery(args, api, extraOptions);
    } catch (error) {
      // Если обновить токен не удалось
      localStorage.removeItem('accessToken');
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
          credentials:'include'
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