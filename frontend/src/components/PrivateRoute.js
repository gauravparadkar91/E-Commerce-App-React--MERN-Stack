import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Check authentication status
  const isAuthenticated = () => {
    // Check if the user is authenticated based on the presence of a token in localStorage
    return localStorage.getItem('authToken') !== null;
  };

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/sign-in" replace />}
    />
  );
};

export default PrivateRoute;
