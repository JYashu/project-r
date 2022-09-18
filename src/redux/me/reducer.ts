/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import config from '../../utils/config.json';
import {
  clearClipboard,
  copyText,
  setGlobalConfig,
  setGlobalHeader,
  setIsClipboardVisible,
  setIsContentStatic,
} from './actions';
import { MeActions, MeState } from './types';

const initialState: MeState = {
  title: 'Global Header',
  setting: localStorage.getItem('config')
    ? JSON.parse(localStorage.getItem('config') || '')
    : config,
  clipboard: { isVisible: false, hideItself: false },
  isContentStatic: true,
};

export default createReducer<MeState, MeActions>(initialState)
  .handleAction(setGlobalHeader, (state, { payload }) =>
    produce(state, (draft) => {
      draft.title = payload.title;
    }),
  )
  .handleAction(setGlobalConfig, (state, { payload }) =>
    produce(state, (draft) => {
      draft.setting = payload.config;
    }),
  )
  .handleAction(copyText.success, (state, { payload }) =>
    produce(state, (draft) => {
      const data = localStorage.getItem('clipboard')?.split(',') || [];
      const idx = data.indexOf(payload.text);
      if (idx > -1) data.splice(idx, 1);
      data.push(payload.text);
      localStorage.setItem('clipboard', data.toString());
    }),
  )
  .handleAction(setIsClipboardVisible, (state, { payload }) =>
    produce(state, (draft) => {
      draft.clipboard = { ...draft.clipboard, ...payload };
    }),
  )
  .handleAction(clearClipboard, (state) =>
    produce(state, (draft) => {
      localStorage.removeItem('clipboard');
    }),
  )
  .handleAction(setIsContentStatic, (state, { payload }) =>
    produce(state, (draft) => {
      draft.isContentStatic = payload.isStatic;
    }),
  );
