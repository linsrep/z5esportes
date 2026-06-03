import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isOrganizerAuthenticated } from '../lib/auth';

interface RequireOrganizerProps {
  children: ReactNode;
}

export default function RequireOrganizer({ children }: RequireOrganizerProps) {
  const location = useLocation();

  if (!isOrganizerAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
