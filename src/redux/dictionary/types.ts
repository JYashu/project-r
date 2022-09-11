import { ActionType } from 'typesafe-actions';
import { Definition } from '../../types';
import { setIsVisible, openDictionary, getDefinitions } from './actions';

export interface DictionaryState {
  isVisible: boolean;
  selectedText: string;
  isLoading: boolean;
  data: Definition[];
  error: string | null;
}

export type DictionaryActions =
  | ActionType<typeof openDictionary>
  | ActionType<typeof setIsVisible>
  | ActionType<typeof getDefinitions>;
