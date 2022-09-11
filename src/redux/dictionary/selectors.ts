import { State } from '../types';

export const selectDictionaryState = (state: State) => state.dictionary;

export const selectSelectedText = (state: State) => selectDictionaryState(state).selectedText;

export const selectDefinitions = (state: State) => selectDictionaryState(state).data;

export const selectIsDictionaryVisible = (state: State) => selectDictionaryState(state).isVisible;
