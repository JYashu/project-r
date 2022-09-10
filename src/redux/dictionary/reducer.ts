/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { boolean } from 'yup';
import { setIsVisible, openDictionary, getDefinitions } from './actions';
import { DictionaryState, DictionaryActions } from './types';

const initialState: DictionaryState = {
  isVisible: false,
  selectedText: '',
  isLoading: false,
  data: [],
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
  )
  .handleAction(getDefinitions.request, state =>
    produce(state, draft => {
      draft.isLoading = true;
    }),
  )
  .handleAction(getDefinitions.success, (state, { payload }) =>
    produce(state, draft => {
      draft.data = payload.data.map((definition: any) => {
        return {
          meaning: definition.meanings[0].definitions[0],
          partOfSpeech: definition.meanings[0].partOfSpeech,
          phonetics: definition.phonetics[0],
        };
      });
      draft.isLoading = false;
    }),
  )
  .handleAction(getDefinitions.failure, state =>
    produce(state, draft => {
      draft.isLoading = false;
    }),
  );
