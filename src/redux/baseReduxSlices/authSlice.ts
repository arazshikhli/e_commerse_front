import { createSlice,PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
interface AuthToken{
    token:string|null;
    isAdmin:boolean;
    isAuth:boolean;
    email:string|null
}


const initialState: AuthToken = {
    token: localStorage.getItem('token')?JSON.parse(localStorage.getItem('isAdmin') as string):null,
    isAdmin: localStorage.getItem('isAdmin')?Boolean(JSON.parse(localStorage.getItem('isAdmin') as string)):false,
    isAuth: localStorage.getItem('isAuth')?Boolean(JSON.parse(localStorage.getItem('isAuth') as string)):false,
    email: localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email') as string) : null
};


 const tokenSlice=createSlice({
    name:'token',
    initialState,
    reducers:{
        setToken:(state,action:PayloadAction<{token:string,isAdmin:boolean,email:string}>)=>{
            state.token=action.payload.token;
            state.isAdmin=action.payload.isAdmin;
            state.email=action.payload.email;
            state.isAuth=true;
            localStorage.setItem('isAuth',JSON.stringify(state.isAuth))
        
        },
        clearToken:(state)=>{
            state.token=null;
            state.isAdmin=false;
            state.isAuth=false
        }
    }
})

export const isauth=(state:RootState)=>state.token.isAuth
export const isadmin=(state:RootState)=>state.token.isAdmin
export const usermail=(state:RootState)=>state.token.email
export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;