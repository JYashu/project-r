import { ActionType } from 'typesafe-actions';
import { storeFileData, scrapFileDataById } from './actions';

export interface FileReaderState {
  filesById: { [id: string]: { file: File; type: string } };
  ids: string[];
}

export type FileReaderActions =
  | ActionType<typeof storeFileData>
  | ActionType<typeof scrapFileDataById>;
