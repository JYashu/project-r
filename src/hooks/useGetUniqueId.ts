import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIds } from '../redux/fileReader';
import { getUniqueId } from '../utils/helpers';

export default () => {
  const ids = useSelector(selectIds);

  return { id: getUniqueId(ids) };
};
