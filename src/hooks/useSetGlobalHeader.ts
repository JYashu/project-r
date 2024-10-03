import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalHeader } from '../redux/me';
import { PagesType } from '../utils/consts';

export default (title: PagesType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGlobalHeader({ title }));
  }, [dispatch, title]);
};
