import {BaseQueryFn, createApi,FetchArgs,fetchBaseQuery, FetchBaseQueryError,BaseQueryApi,FetchBaseQueryMeta} from '@reduxjs/toolkit/query/react'
import { logout, setTokens } from '../baseReduxSlices/authSlice';


const isTokenExpired = (token:any) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now(); // Проверяем, не истек ли токен
};

// Функция для обновления токена
const refreshAccessToken = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_SERVER_URL || 'http://localhost:5000'}users/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  localStorage.setItem('accessToken', data.accessToken);
  console.log('access From refresh', data.accessToken);
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
  credentials:'include'
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const token = localStorage.getItem('accessToken');

  // Проверяем, не истек ли токен
  if (token && isTokenExpired(token)) {
    console.log('Токен истек, пытаемся обновить...');
    try {
      const newAccessToken = await refreshAccessToken(); // Обновляем токен
      api.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: null }));
    } catch (error) {
      localStorage.removeItem('accessToken');
      api.dispatch(logout());
      return {
        error: {
          status: 401,
          data: 'Не удалось обновить токен',
        },
      };
    }
  }

  // Выполняем базовый запрос
  let result = await baseQuery(args, api, extraOptions);

  // Если получили ошибку 401, пытаемся обновить токен заново
  if (result.error && result.error.status === 401) {
    console.log('Токен истек во время запроса, пытаемся обновить...');
    try {
      const newAccessToken = await refreshAccessToken(); // Обновляем токен
      api.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: null }));

      // Повторяем оригинальный запрос с новым токеном
      result = await baseQuery(args, api, extraOptions);
    } catch (error) {
      localStorage.removeItem('accessToken');
      api.dispatch(logout());
      return {
        error: {
          status: 401,
          data: 'Не удалось обновить токен',
        },
      };
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

        return ({
          url: 'users/register',
          method: 'POST',
          body: userData,
          credentials:'include'
        })
      },
      invalidatesTags: ['Users'],
    }),
    googleLogin: builder.mutation({
      query: (credential) => ({
        url: 'users/auth',
        method: 'POST',
        body: { credential },
      }),
    }),

    login: builder.mutation({
      query: (credentials) => {

        return ({
          url: 'users/login',
          method: 'POST',
          body: credentials,
          credentials:'include'
        })

      },invalidatesTags:['Users']

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
  useGoogleLoginMutation
} = authApi;