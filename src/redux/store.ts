import {configureStore} from '@reduxjs/toolkit'
import { authRTKSlice } from './rtk/authRTK'
import tokenReducer from './baseReduxSlices/authSlice'
export const store=configureStore({
    reducer:{
        [authRTKSlice.reducerPath]:authRTKSlice.reducer,
        token:tokenReducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(authRTKSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;