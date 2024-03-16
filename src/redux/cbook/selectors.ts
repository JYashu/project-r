import { State } from '../types';

export const selectCBookState = (state: State) => state.cbook;

export const selectCellContentById =
  ({ id }: { id: string }) =>
  (state: State) =>
    selectCBookState(state).data[id].content;
