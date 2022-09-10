import { ActionType } from 'typesafe-actions';
import { setIsVisible, openDictionary, getDefinitions } from './actions';

export interface DictionaryState {
  isVisible: boolean;
  selectedText: string;
  isLoading: boolean;
  data: any;
}

export type DictionaryActions =
  | ActionType<typeof openDictionary>
  | ActionType<typeof setIsVisible>
  | ActionType<typeof getDefinitions>;
