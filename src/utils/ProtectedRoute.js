import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  return (
   props.token ? props.element : <Navigate to="/" />
)};

export default ProtectedRoute;