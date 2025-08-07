// src/components/PublicRoute.jsx
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PublicRoute = ({ children }) => {
  const { token } = useContext(AppContext)

  return token ? <Navigate to="/" replace /> : children
}

export default PublicRoute
