import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalHeader } from '../redux/me';

export default (title: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGlobalHeader({ title }));
  }, [dispatch]);
};
