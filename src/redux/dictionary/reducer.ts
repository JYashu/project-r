/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { setIsVisible, openDictionary, getDefinitions } from './actions';
import { DictionaryState, DictionaryActions } from './types';

const initialState: DictionaryState = {
  isVisible: false,
  selectedText: '',
  isLoading: false,
  data: [],
  error: null,
};

export default createReducer<DictionaryState, DictionaryActions>(initialState)
  .handleAction(openDictionary.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.selectedText = payload.word || '';
    }),
  )
  .handleAction(setIsVisible, (state, { payload }) =>
    produce(state, (draft) => {
      draft.isVisible = payload.isVisible;
    }),
  )
  .handleAction(getDefinitions.request, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.data = [];
      draft.error = null;
    }),
  )
  .handleAction(getDefinitions.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.error = null;
      draft.isLoading = false;
      draft.data = payload.data.map((item: any) => {
        let text = '';
        let audio = '';
        const phonetics = item.phonetics.forEach((ph: any) => {
          if (ph.text) text = ph.text;
          if (ph.audio) audio = ph.audio;
        });
        return {
          word: item.word,
          phonetics: { text, audio },
          meanings: item.meanings,
        };
      });
    }),
  )
  .handleAction(getDefinitions.failure, (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.data = [];
      draft.error = payload.message;
    }),
  );
