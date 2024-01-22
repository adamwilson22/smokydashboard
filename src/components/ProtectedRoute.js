import React from "react";
import { useHistory } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import AppRoutes from "../services/AppRoutes";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const history = useHistory();
  if (!user) {
    history.push(AppRoutes.login);
  }
  return children;
};

export default ProtectedRoute;
