import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectAccessGranted } from '../redux/me';
import ENV from '../utils/env';

const useGetEnvironment = () => {
  const accessGranted = useSelector(selectAccessGranted);
  const { isDevelopment, isProduction } = ENV;
  const [isDev, setIsDev] = useState(isDevelopment || accessGranted.devAccess);
  const [isProd, setIsProd] = useState(isProduction && !accessGranted.devAccess);

  return { isDev, isProd };
};

export default useGetEnvironment;
