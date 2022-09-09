/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { setIsVisible, openDictionary } from './actions';
import { DictionaryState, DictionaryActions } from './types';

const initialState: DictionaryState = {
  isVisible: false,
  selectedText: '',
};

export default createReducer<DictionaryState, DictionaryActions>(initialState)
  .handleAction(openDictionary.success, (state, { payload }) =>
    produce(state, draft => {
      draft.selectedText = payload.text || '';
    }),
  )
  .handleAction(setIsVisible, (state, { payload }) =>
    produce(state, draft => {
      draft.isVisible = payload.isVisible;
    }),
  );
