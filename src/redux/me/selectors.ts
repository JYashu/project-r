import { State } from '../types';

export const selectMeState = (state: State) => state.me;

export const selectGlobalHeaderTitle = (state: State) => selectMeState(state).title;

export const selectGlobalConfig = (state: State) => selectMeState(state).setting;

export const selectClockFormat = (state: State) => selectGlobalConfig(state).clock.format12h;

export const selectClipboardData = (state: State) =>
  localStorage.getItem('clipboard')?.split(',').reverse();

export const selectClipboardState = (state: State) => selectMeState(state).clipboard;

export const selectIsContentStatic = (state: State) => selectMeState(state).isContentStatic;
