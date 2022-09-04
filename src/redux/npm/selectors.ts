import { State } from '../types';

export const selectNPMRepoState = (state: State) => state.npmRepo;

export const selectNPMRepoData = (state: State) =>
  selectNPMRepoState(state).data;
