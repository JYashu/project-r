import { ActionType } from 'typesafe-actions';
import { setIsVisible, openDictionary } from './actions';

export interface DictionaryState {
  isVisible: boolean;
  selectedText: string;
}

export type DictionaryActions = ActionType<typeof openDictionary> | ActionType<typeof setIsVisible>;
