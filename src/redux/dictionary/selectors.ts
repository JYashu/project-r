import { State } from '../types';

export const selectDictionaryState = (state: State) => state.dictionary;

export const selectSelectedText = (state: State) => selectDictionaryState(state).selectedText;
