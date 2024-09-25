import { useLocation,Navigate} from "react-router-dom";
import { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode; 
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();

  const isAuthenticated = false; 

  if (!isAuthenticated) {
    return <Navigate to={'/auth'} state={{ from: location }} />;
  }

  return <>{children}</>;
}
