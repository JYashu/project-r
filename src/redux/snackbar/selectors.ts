import { createSelector } from 'reselect';

import { State } from '../types';

export const selectSnackbarState = (state: State) => state.snackbar;
export const selectSnacks = (state: State) => selectSnackbarState(state).snacks;
export const selectSnack = createSelector(
  [selectSnacks, (_: State, { snackId }: { snackId: string }) => snackId],
  (snacks, snackId) => snacks.find(({ id }) => id === snackId),
);
