import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedScreen = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [ isAuthenticated, navigate ]);

  return (
    <>
      { children }
    </>
  );
}