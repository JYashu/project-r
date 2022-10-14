/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { getModules } from './actions';
import { NPMRepoState, NPMRepoActions } from './types';

const initialState: NPMRepoState = {
  isLoading: false,
  error: null,
  data: [],
};

export default createReducer<NPMRepoState, NPMRepoActions>(initialState)
  .handleAction(getModules.request, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
    }),
  )
  .handleAction(getModules.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false;

      draft.data = payload.objects.map((repo: any) => {
        return {
          name: repo.package.name,
          description: repo.package.description,
          link: repo.package.links.npm,
          date: repo.package.date,
          publisher: repo.package.publisher.username,
          version: repo.package.version,
        };
      });
    }),
  )
  .handleAction(getModules.failure, (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = payload.message;
    }),
  );
