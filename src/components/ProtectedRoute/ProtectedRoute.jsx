
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
