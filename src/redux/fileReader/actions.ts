import { createAction } from 'typesafe-actions';
import { FileObj } from '../../elements/field/types';

export const storeFileData = createAction(
  'STORE_FILE_DATA',
  (action) => (payload: { fileData: FileObj; id: string }) => action(payload),
);

export const scrapFileDataById = createAction(
  'CLEAR_FILE_DATA',
  (action) => (payload: { id: string }) => action(payload),
);
