import { useLocation,Navigate} from "react-router-dom";
import { ReactNode } from "react";
import {tokenFromStore} from '../redux/baseReduxSlices/authSlice';
import { useSelector,useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

interface RequireAdminProps {
  children: ReactNode;
}
interface IToken{
    id:string;
    email:string;
    isAdmin:boolean;
}
export const RequireAdmin= ({ children }: RequireAdminProps) => {
  const location = useLocation();
  const dispatch=useDispatch();
  const accessToken=useSelector(tokenFromStore);
    let isAdmin:boolean=false
    let email=''
    if(accessToken){
        try{
            const decoded: IToken = jwtDecode<IToken>(accessToken); // Decode the token correctly
            console.log(decoded)
            isAdmin = decoded.isAdmin;
            email=decoded.email
             // Check if the user is an admin
            console.log("isAdmin: ",isAdmin)
        }
        catch(err){
            console.error('Error decoding token:', err);
        }
    }

  if (email!=='admin@gmail.com') {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }

  return <>{children}</>;
}
