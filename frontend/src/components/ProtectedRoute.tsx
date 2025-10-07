import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

type ProtectedRouteProps = {
  redirectTo?: string;
};

export default function ProtectedRoute({ redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}


