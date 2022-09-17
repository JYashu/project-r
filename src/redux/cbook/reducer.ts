/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { Cell } from '../../types';
import {
  updateCell,
  deleteCell,
  moveCell,
  insertCellAfter,
  createBundle,
  fetchCells,
  saveCells,
  togglePreview,
} from './actions';
import { CBookState, CBookActions } from './types';

const initialState: CBookState = {
  loading: false,
  error: null,
  order: [],
  data: {},
  bundle: {},
};

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default createReducer<CBookState, CBookActions>(initialState)
  .handleAction(updateCell, (state, { payload }) =>
    produce(state, draft => {
      const { id, content } = payload;

      draft.data[id].content = content;
    }),
  )
  .handleAction(deleteCell, (state, { payload }) =>
    produce(state, draft => {
      delete draft.data[payload.id];
      draft.order = draft.order.filter(id => id !== payload.id);
    }),
  )
  .handleAction(moveCell, (state, { payload }) =>
    produce(state, draft => {
      const { direction } = payload;
      const index = state.order.findIndex(id => id === payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        // return state;
      } else {
        draft.order[index] = draft.order[targetIndex];
        draft.order[targetIndex] = payload.id;
      }
    }),
  )
  .handleAction(insertCellAfter, (state, { payload }) =>
    produce(state, draft => {
      const cell: Cell = {
        content: '',
        type: payload.cellType,
        id: randomId(),
        showPreview: payload.cellType === 'code' ? true : undefined,
      };

      draft.data[cell.id] = cell;
      const foundIndex = draft.order.findIndex(id => id === payload.id);

      if (foundIndex < 0) {
        draft.order.unshift(cell.id);
      } else {
        draft.order.splice(foundIndex + 1, 0, cell.id);
      }
    }),
  )
  .handleAction(fetchCells.request, (state, { payload }) =>
    produce(state, draft => {
      draft.loading = true;
      draft.error = null;
    }),
  )
  .handleAction(fetchCells.success, (state, { payload }) =>
    produce(state, draft => {
      draft.loading = false;
      draft.order = payload.data.map(cell => cell.id);
      draft.data = payload.data.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CBookState['data']);
    }),
  )
  .handleAction(fetchCells.failure, (state, { payload }) =>
    produce(state, draft => {
      draft.loading = false;
      draft.data = {};
      draft.error = payload.message;
    }),
  )
  .handleAction(saveCells.failure, (state, { payload }) =>
    produce(state, draft => {
      draft.error = payload.message;
    }),
  )
  .handleAction(createBundle.request, (state, { payload }) =>
    produce(state, draft => {
      draft.bundle[payload.cellId] = {
        processing: true,
        code: '',
        error: '',
      };
    }),
  )
  .handleAction(createBundle.success, (state, { payload }) =>
    produce(state, draft => {
      draft.bundle[payload.cellId] = {
        processing: false,
        code: payload.bundle.code,
        error: payload.bundle.error,
      };
    }),
  )
  .handleAction(createBundle.failure, (state, { payload }) =>
    produce(state, draft => {
      draft.error = payload.message;
    }),
  )
  .handleAction(togglePreview, (state, { payload }) =>
    produce(state, draft => {
      const { id } = payload;

      draft.data[id].showPreview = !state.data[id].showPreview;
    }),
  );
