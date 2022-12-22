import React from 'react';
import { Redirect } from 'react-router';
import ENV from '../../utils/env';

interface PermissionsManagerProps {
  children: React.ReactElement;
  isBetaOnly?: boolean;
  isHiddenForProd?: boolean;
}

export const PermissionsManager = ({
  children,
  isBetaOnly,
  isHiddenForProd,
}: PermissionsManagerProps) => {
  const isProd = ENV.isProduction;
  if (isBetaOnly && isProd) {
    return <Redirect to="/404" />;
  }
  if (isHiddenForProd && isProd) {
    return null;
  }

  return children;
};

export default PermissionsManager;
