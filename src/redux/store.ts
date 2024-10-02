import {configureStore} from '@reduxjs/toolkit'
import {productModelsApi} from './rtk/modelsApi';
import {authApi} from './rtk/authApi'
import {productApi}from './rtk/productsApi'
import tokenReducer from './baseReduxSlices/authSlice'
export const store=configureStore({
    reducer:{
        [productApi.reducerPath]:productApi.reducer,
        [productModelsApi.reducerPath]:productModelsApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        token:tokenReducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(productApi.middleware,productModelsApi.middleware,authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;