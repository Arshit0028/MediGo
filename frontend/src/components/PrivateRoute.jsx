// src/components/PrivateRoute.jsx
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AppContext)

  return token ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
