import { ActionType } from 'typesafe-actions';
import { FileType } from '../../elements/field/types';
import { setToFrom } from './actions';

export interface ConverterState {
  fromField?: FileType;
  toField?: FileType;
}

export type ConverterActions = ActionType<typeof setToFrom>;
