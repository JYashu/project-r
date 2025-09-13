import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetEnvironment from '../../hooks/useGetEnvironment';
import { selectAccessGranted } from '../../redux/me';

interface PermissionsManagerProps {
  children: React.ReactElement;
  isLogout?: boolean;
  isBetaOnly?: boolean;
  isHiddenForProd?: boolean;
}

export const PermissionsManager = ({
  children,
  isLogout,
  isBetaOnly,
  isHiddenForProd,
}: PermissionsManagerProps) => {
  const { isProd } = useGetEnvironment();
  const accessGranted = useSelector(selectAccessGranted);

  if (isBetaOnly && isProd) {
    return <Navigate to="/404" />;
  }
  if (isHiddenForProd && isProd) {
    return null;
  }

  if (isLogout && !accessGranted.apiAccess && !accessGranted.devAccess) {
    return null;
  }

  return children;
};

export default PermissionsManager;
