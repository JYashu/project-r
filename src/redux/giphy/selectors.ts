import { State } from '../types';

export const selectGIFRepoState = (state: State) => state.gifRepo;

export const selectGIFRepoData = (state: State) => selectGIFRepoState(state).data;
