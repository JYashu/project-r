import { createAction } from 'typesafe-actions';
import { FileType } from '../../elements/field/types';
import { AIMode } from '../../types';

export const setToFrom = createAction(
  'SET_TO_FROM',
  (action) => (payload: { from: FileType; to: FileType }) => action(payload),
);
