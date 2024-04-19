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
  loadFileData,
} from './actions';
import { CBookState, CBookActions } from './types';
import { getUniqueId } from '../../utils/helpers';

const initialState: CBookState = {
  loading: false,
  error: null,
  order: [],
  data: {},
  bundle: {},
};

export default createReducer<CBookState, CBookActions>(initialState)
  .handleAction(updateCell, (state, { payload }) =>
    produce(state, (draft) => {
      const { id, content } = payload;

      draft.data[id].content = content;
    }),
  )
  .handleAction(deleteCell, (state, { payload }) =>
    produce(state, (draft) => {
      delete draft.data[payload.id];
      draft.order = draft.order.filter((id) => id !== payload.id);
    }),
  )
  .handleAction(moveCell, (state, { payload }) =>
    produce(state, (draft) => {
      const { direction } = payload;
      const index = state.order.findIndex((id) => id === payload.id);
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
    produce(state, (draft) => {
      const cell: Cell = {
        content: '',
        type: payload.cellType,
        id: getUniqueId(draft.order),
        showPreview: payload.cellType === 'code' ? true : undefined,
      };

      draft.data[cell.id] = cell;
      const foundIndex = draft.order.findIndex((id) => id === payload.id);

      if (foundIndex < 0) {
        draft.order.unshift(cell.id);
      } else {
        draft.order.splice(foundIndex + 1, 0, cell.id);
      }
    }),
  )
  .handleAction(fetchCells.request, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    }),
  )
  .handleAction(fetchCells.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.order = payload.data.map((cell) => cell.id);
      draft.data = payload.data.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CBookState['data']);
    }),
  )
  .handleAction(fetchCells.failure, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.data = {};
      draft.error = payload.message;
    }),
  )
  .handleAction(saveCells.failure, (state, { payload }) =>
    produce(state, (draft) => {
      draft.error = payload.message;
    }),
  )
  .handleAction(createBundle.request, (state, { payload }) =>
    produce(state, (draft) => {
      draft.bundle[payload.cellId] = {
        processing: true,
        code: '',
        error: '',
      };
    }),
  )
  .handleAction(createBundle.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.bundle[payload.cellId] = {
        processing: false,
        code: payload.bundle.code,
        error: payload.bundle.error,
      };
    }),
  )
  .handleAction(createBundle.failure, (state, { payload }) =>
    produce(state, (draft) => {
      draft.error = payload.message;
    }),
  )
  .handleAction(togglePreview, (state, { payload }) =>
    produce(state, (draft) => {
      const { id } = payload;

      draft.data[id].showPreview = !state.data[id].showPreview;
    }),
  )
  .handleAction(loadFileData, (state, { payload }) =>
    produce(state, (draft) => {
      let content;
      let order: string[] | null = null;
      let data: {
        [key: string]: Cell;
      } = {};
      try {
        content = JSON.parse(payload.content);
        order = content.order;
        data = content.data;
      } catch (e) {
        console.error('Error parsing file', e); // eslint-disable-line
      }
      if (payload.resetBook) {
        draft.order = [];
        draft.data = {};
        if (!order || order === null) {
          const cell: Cell = {
            content: payload.content,
            type: 'md',
            id: getUniqueId(draft.order),
            showPreview: undefined,
          };

          draft.data[cell.id] = cell;
          draft.order.push(cell.id);
        } else {
          draft.order = [...order];
          draft.data = { ...data };
        }
      } else if (!order || order === null) {
        const cell: Cell = {
          content: payload.content,
          type: 'md',
          id: getUniqueId(draft.order),
          showPreview: undefined,
        };

        draft.data[cell.id] = cell;
        draft.order.push(cell.id);
      } else {
        order.forEach((value: string) => {
          if (draft.order.includes(value)) {
            const newID = getUniqueId(draft.order);
            draft.order.push(newID);
            draft.data[newID] = data[value];
          } else {
            draft.order.push(value);
            draft.data[value] = data[value];
          }
        });
      }
    }),
  );
