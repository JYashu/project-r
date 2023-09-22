import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalHeader } from '../redux/me';
import { Pages } from '../utils/consts';

export default (title: Pages) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGlobalHeader({ title }));
  }, [dispatch, title]);
};
