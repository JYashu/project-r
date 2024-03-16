import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNavigationItem } from '../redux/navigation';
import { ActiveNavigationItem } from '../types';

export default (activeNavigationItem: ActiveNavigationItem) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveNavigationItem({ activeNavigationItem }));
  }, [dispatch, activeNavigationItem]);
};
