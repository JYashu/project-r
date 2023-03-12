import { createAction } from 'typesafe-actions';

export const storeFileData = createAction(
  'STORE_FILE_DATA',
  (action) => (payload: { fileData: { file: File; type: string }; id: string }) => action(payload),
);

export const scrapFileDataById = createAction(
  'CLEAR_FILE_DATA',
  (action) => (payload: { id: string }) => action(payload),
);
