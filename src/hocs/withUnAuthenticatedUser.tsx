import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../context/store'
import { Navigate } from 'react-router-dom'

export const withUnAuthenticatedUser = <P extends object>(Component: React.FC<P>): React.FC<P> => {
  return (props: P) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    // If authenticated, redirect to home page
    if (isAuthenticated) {
      return <Navigate to="/" replace />
    }

    // Render the wrapped component if authenticated
    return <Component {...props} />
  }
}
