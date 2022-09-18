/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { getAnimes } from './actions';
import { MALState, MALActions } from './types';

const initialState: MALState = {
  isLoading: false,
  error: null,
  data: [],
};

export default createReducer<MALState, MALActions>(initialState)
  .handleAction(getAnimes.request, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
    }),
  )
  .handleAction(getAnimes.success, (state, payload) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.data = payload;
    }),
  )
  .handleAction(getAnimes.failure, (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = payload.message;
    }),
  );
