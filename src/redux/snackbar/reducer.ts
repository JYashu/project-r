import produce from 'immer';
import { createReducer } from 'typesafe-actions';

import { SnackbarState, SnackbarActions } from './types';
import { addSnack, removeSnack } from './actions';
import { Img, SnackType } from '../../types';
import { getUniqueId } from '../../utils/helpers';

export const defaultDuration = 3500; // milliseconds

const initialState: SnackbarState = {
  snacks: [],
};

const { DEFAULT } = SnackType;

/* eslint-disable no-param-reassign */
export default createReducer<SnackbarState, SnackbarActions>(initialState)
  .handleAction(addSnack, (state, { payload }) =>
    produce(state, (draft) => {
      const { duration, ...rest } = payload;
      draft.snacks.push({
        id: getUniqueId(),
        duration: duration || defaultDuration,
        snackType: DEFAULT,
        ...rest,
      });
    }),
  )
  .handleAction(removeSnack, (state, { payload }) =>
    produce(state, (draft) => {
      const index = draft.snacks.findIndex(({ id }) => id === payload.id);
      if (index === -1) {
        return;
      }
      draft.snacks.splice(index, 1);
    }),
  );
