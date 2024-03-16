import { createAction } from 'typesafe-actions';
import { Cell, CellTypes, Direction } from '../../types';
import createAsyncActionWithMeta from '../utils/createAsyncActionWithMeta';

export const updateCell = createAction(
  'UPDATE_CELL',
  (action) => (payload: { id: string; content: string }) => action(payload),
);

export const deleteCell = createAction(
  'DELETE_CELL',
  (action) => (payload: { id: string }) => action(payload),
);

export const moveCell = createAction(
  'MOVE_CELL',
  (action) => (payload: { id: string; direction: Direction }) => action(payload),
);

export const insertCellAfter = createAction(
  'INSERT_CELL_AFTER_SECOND',
  (action) => (payload: { id: string | null; cellType: CellTypes }) => action(payload),
);

export const createBundle = createAsyncActionWithMeta(
  'CREATE_BUNDLE_REQUEST',
  'CREATE_BUNDLE_SUCCESS',
  'CREATE_BUNDLE_FAILURE',
)<
  { cellId: string; input: string },
  {
    cellId: string;
    bundle: {
      code: string;
      error: any;
    };
  },
  Error
>();

export const fetchCells = createAsyncActionWithMeta(
  'FETCH_CELLS_REQUEST',
  'FETCH_CELLS_SUCCESS',
  'FETCH_CELLS_FAILURE',
)<void, { data: Cell[] }, Error>();

export const saveCells = createAsyncActionWithMeta(
  'SAVE_CELLS_REQUEST',
  'SAVE_CELLS_SUCCESS',
  'SAVE_CELLS_FAILURE',
)<void, { cells: { data: any; order: any } }, Error>();

export const togglePreview = createAction(
  'TOGGLE_PREVIEW',
  (action) => (payload: { id: string }) => action(payload),
);

export const loadFileData = createAction(
  'LOAD_FILE_DATA',
  (action) => (payload: { content: string; resetBook: boolean }) => action(payload),
);
