import {configureStore} from '@reduxjs/toolkit'
import { authRTKSlice } from './rtk/authRTK';
import { productsRTKApi} from './rtk/productsRTK'
import tokenReducer from './baseReduxSlices/authSlice'
export const store=configureStore({
    reducer:{
        [authRTKSlice.reducerPath]:authRTKSlice.reducer,
        [productsRTKApi.reducerPath]:productsRTKApi.reducer,
        token:tokenReducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(authRTKSlice.middleware,productsRTKApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;