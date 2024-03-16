/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { AIMode } from '../../types';
import { setToFrom } from './actions';
import { ConverterState, ConverterActions } from './types';

const initialState: ConverterState = {
  fromField: undefined,
  toField: undefined,
};

export default createReducer<ConverterState, ConverterActions>(initialState).handleAction(
  setToFrom,
  (state, { payload }) =>
    produce(state, (draft) => {
      draft.fromField = payload.from;
      draft.toField = payload.to;
    }),
);
