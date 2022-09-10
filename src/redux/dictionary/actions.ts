import { createAction } from 'typesafe-actions';
import createAsyncActionWithMeta from '../utils/createAsyncActionWithMeta';

export const openDictionary = createAsyncActionWithMeta(
  'OPEN_DICTIONARY_REQUEST',
  'OPEN_DICTIONARY_SUCCESS',
  'OPEN_DICTIONARY_FAILURE',
)<void, { text?: string }, Error>();

export const setIsVisible = createAction(
  'SET_IS_DICTIONARY_VISIBLE',
  action => (payload: { isVisible: boolean }) => action(payload),
);

export const getDefinitions = createAsyncActionWithMeta(
  'GET_DEFINITION_REQUEST',
  'GET_DEFINITION_SUCCESS',
  'GET_DEFINITION_FAILURE',
)<{ word: string }, { data: any }, Error>();
