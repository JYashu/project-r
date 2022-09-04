import { createAction } from 'typesafe-actions';
import { Config } from '../../types';
import createAsyncActionWithMeta from '../utils/createAsyncActionWithMeta';

export const setGlobalHeader = createAction(
  'SET_GLOBAL_HEADER',
  action => (payload: { title: string }) => action(payload),
);

export const setGlobalConfig = createAction(
  'SET_GLOBAL_CONFIG',
  action => (payload: { config: Config }) => action(payload),
);

export const copyText = createAsyncActionWithMeta(
  'COPY_TEXT_REQUEST',
  'COPY_TEXT_SUCCESS',
  'COPY_TEXT_FAILURE',
)<{ text: string }, { text: string }, Error>();

export const setIsClipboardVisible = createAction(
  'SET_IS_VISIBLE',
  action => (payload: { isVisible: boolean; hideItself: boolean }) => action(payload),
);

export const clearClipboard = createAction('CLEAR_CLIPBOARD', action => () => action());

export const setIsContentStatic = createAction(
  'SET_IS_CONTENT_STATIC',
  action => (payload: { isStatic: boolean }) => action(payload),
);

export const completeSignIn = createAsyncActionWithMeta(
  'COMPLETE_SIGN_IN_REQUEST',
  'COMPLETE_SIGN_IN_SUCCESS',
  'COMPLETE_SIGN_IN_FAILURE',
)<{ username: string; password: string }, void, Error>();
