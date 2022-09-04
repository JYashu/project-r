import { createAction } from 'typesafe-actions';

import { Snack } from '../../types';

export const addSnack = createAction(
  'ADD_SNACK',
  action => (payload: Omit<Snack, 'id' | 'snackType'> | Omit<Snack, 'id'>) => action(payload),
);

export const removeSnack = createAction(
  'REMOVE_SNACK',
  action => (payload: Pick<Snack, 'id' | 'snackType'> | Pick<Snack, 'id'>) => action(payload),
);
