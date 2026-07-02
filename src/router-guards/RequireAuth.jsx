import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Loader from '../components/ui/Loader.jsx'

export default function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <Loader fullScreen label="Loading your workspace..." />
  if (!isAuthenticated) return <Navigate to="/auth/login" state={{ from: location }} replace />
  return <Outlet />
}
