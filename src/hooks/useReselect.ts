import { ParametricSelector } from 'reselect';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { State } from '../redux/types';

const useReselect = <P, R>(selector: ParametricSelector<State, P, R>, props: P) => {
  const stateSelector = useMemo(() => {
    return (state: State) => selector(state, props);
  }, [selector, props]);

  return useSelector(stateSelector);
};

export default useReselect;
