import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

type PublicRouteProps = {
  whenAuthenticatedRedirectTo?: string;
};

export default function PublicRoute({ whenAuthenticatedRedirectTo = '/' }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={whenAuthenticatedRedirectTo} replace />;
  return <Outlet />;
}


