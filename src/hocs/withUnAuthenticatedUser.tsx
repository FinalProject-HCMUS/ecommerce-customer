import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../context/store';
import { Navigate } from 'react-router-dom';

export const withUnAuthenticatedUser = <P extends object>(
  Component: React.FC<P>
): React.FC<P> => {
  return (props: P) => {
    const auth = useSelector((state: RootState) => state.auth);

    // If authenticated, redirect to home page
    if (auth.isAuthenticated && auth.userInfo && auth.accessToken) {
      return <Navigate to="/" replace />;
    }

    // Render the wrapped component if authenticated
    return <Component {...props} />;
  };
};
