import { State } from '../types';

export const selectMALState = (state: State) => state.mal;

export const selectMALData = (state: State) => selectMALState(state).data;
