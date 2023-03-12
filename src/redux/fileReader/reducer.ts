/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { storeFileData, scrapFileDataById } from './actions';
import { FileReaderActions, FileReaderState } from './types';

const initialState: FileReaderState = {
  filesById: {},
  ids: [],
};

export default createReducer<FileReaderState, FileReaderActions>(initialState)
  .handleAction(storeFileData, (state, { payload }) =>
    produce(state, (draft) => {
      const { id, fileData } = payload;
      const allIds = new Set(draft.ids);
      allIds.add(id);
      draft.filesById[id] = fileData;
      draft.ids = Array.from(allIds);
    }),
  )
  .handleAction(scrapFileDataById, (state, { payload }) =>
    produce(state, (draft) => {
      const { id } = payload;
      const allIds = new Set(draft.ids);
      allIds.delete(id);
      delete draft.filesById[id];
      draft.ids = Array.from(allIds);
    }),
  );
