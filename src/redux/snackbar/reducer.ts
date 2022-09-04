import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { v4 as uuidv4 } from 'uuid';

import { SnackbarState, SnackbarActions } from './types';
import { addSnack, removeSnack } from './actions';
import { Img, SnackType } from '../../types';

export const defaultDuration = 3500; // milliseconds

const initialState: SnackbarState = {
  snacks: [
    // {
    //   id: 'd8fa210c-4ed8-43e4-9b67-f085f8e85a63',
    //   duration: 3500,
    //   snackType: SnackType.SUCCESS,
    //   message: 'Welcome, ',
    //   img: Img.Wave,
    // },
  ],
};

const { DEFAULT } = SnackType;

/* eslint-disable no-param-reassign */
export default createReducer<SnackbarState, SnackbarActions>(initialState)
  .handleAction(addSnack, (state, { payload }) =>
    produce(state, (draft) => {
      const { duration, ...rest } = payload;
      draft.snacks.push({
        id: uuidv4(),
        duration: duration || defaultDuration,
        snackType: DEFAULT,
        ...rest,
      });
    })
  )
  .handleAction(removeSnack, (state, { payload }) =>
    produce(state, (draft) => {
      const index = draft.snacks.findIndex(({ id }) => id === payload.id);
      if (index === -1) {
        return;
      }
      draft.snacks.splice(index, 1);
    })
  );
