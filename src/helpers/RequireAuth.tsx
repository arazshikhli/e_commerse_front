import { useLocation,Navigate} from "react-router-dom";
import { ReactNode } from "react";
import {tokenFromStore} from '../redux/baseReduxSlices/authSlice';
import { useSelector,useDispatch } from "react-redux";
interface RequireAuthProps {
  children: ReactNode; 
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const dispatch=useDispatch();
  const accessToken=useSelector(tokenFromStore);
  const isAuthenticated = accessToken?true:false; 


  if (!isAuthenticated) {
    return <Navigate to={'/register'} state={{ from: location }} />;
  }

  return <>{children}</>;
}
