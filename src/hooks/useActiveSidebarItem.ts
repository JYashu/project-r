import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSidebarItem } from '../redux/sidebar';
import { ActiveSidebarItem } from '../types';

export default (activeSidebarItem: ActiveSidebarItem) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveSidebarItem({ activeSidebarItem }));
  }, [dispatch]);
};
