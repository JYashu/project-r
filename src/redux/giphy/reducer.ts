import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { getGifs } from './actions';
import { GIFRepoState, GIFRepoActions } from './types';

const initialState: GIFRepoState = {
  isLoading: false,
  error: null,
  data: [],
};

export default createReducer<GIFRepoState, GIFRepoActions>(initialState)
  .handleAction(getGifs.request, (state) =>
    produce(state, (draft) => {
      console.log(draft);
      draft.isLoading = true;
    })
  )
  .handleAction(getGifs.success, (state, { payload }) =>
    produce(state, (draft) => {
      console.log(draft);
      draft.isLoading = false;
      draft.data = payload.data;
    })
  )
  .handleAction(getGifs.failure, (state, { payload }) =>
    produce(state, (draft) => {
      console.log(draft);
      draft.isLoading = false;
      draft.error = payload.message;
    })
  );
