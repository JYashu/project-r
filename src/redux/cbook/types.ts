import { ActionType } from 'typesafe-actions';
import { Cell, Definition } from '../../types';
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

export interface CBookState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
  bundle: {
    [key: string]:
      | {
          processing: boolean;
          code: string;
          error: string;
        }
      | undefined;
  };
}

export type CBookActions =
  | ActionType<typeof updateCell>
  | ActionType<typeof deleteCell>
  | ActionType<typeof moveCell>
  | ActionType<typeof insertCellAfter>
  | ActionType<typeof createBundle>
  | ActionType<typeof fetchCells>
  | ActionType<typeof saveCells>
  | ActionType<typeof togglePreview>
  | ActionType<typeof loadFileData>;
