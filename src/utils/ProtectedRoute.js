import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  return (
    true ? props.element : <Navigate to="/" replace/>
)};

export default ProtectedRoute;