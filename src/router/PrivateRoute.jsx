import React from 'react';
import { Navigate } from 'react-router-dom';
import TokenService from '../config/tokenservice';


const PrivateRoute = ({ element, requiredRole }) => {
  const userRole = TokenService.getUserRole(); 
  if (userRole === requiredRole) {
    return element; 
  } else {
    return <Navigate to="/404error" />; 
  }
};

export default PrivateRoute;