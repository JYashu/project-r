import { ActionType } from 'typesafe-actions';
import { FileObj } from '../../elements/field/types';
import { storeFileData, scrapFileDataById } from './actions';

export interface FileReaderState {
  filesById: { [id: string]: FileObj };
  ids: string[];
}

export type FileReaderActions =
  | ActionType<typeof storeFileData>
  | ActionType<typeof scrapFileDataById>;
