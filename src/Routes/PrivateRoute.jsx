

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";





const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location.pathname);

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>
  }

  if (user) {
    return children;
  }

  return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;