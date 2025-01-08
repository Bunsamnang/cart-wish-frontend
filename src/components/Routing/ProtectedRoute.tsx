import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getJwt } from "../services/userServices";
import { useOpen } from "../../hooks/useOpen";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const location = useLocation();
  const { setOpenLoginModal, setRedirectFrom } = useOpen();

  // !! to get boolean value
  const isAuthenticated = !!getJwt();

  useEffect(() => {
    if (!isAuthenticated) {
      setOpenLoginModal(true);
      setRedirectFrom(location.pathname);
    }
  }, [isAuthenticated, setOpenLoginModal, location.pathname, setRedirectFrom]);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;
