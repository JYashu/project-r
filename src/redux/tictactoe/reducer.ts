/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { AIMode } from '../../types';
import {
  setAIMode,
  setBoard,
  setHistory,
  setOpen,
  setStepNumber,
  setVsAI,
  setXIsNext,
} from './actions';
import { TicTacToeState, TicTacToeActions } from './types';

const initialState: TicTacToeState = {
  open: false,
  vsAI: false,
  aiMode: AIMode.Difficult,
  xIsNext: true,
  stepNumber: 0,
  board: Array(9).fill(null),
  history: [],
};

export default createReducer<TicTacToeState, TicTacToeActions>(initialState)
  .handleAction(setOpen, (state) =>
    produce(state, (draft) => {
      draft.open = !state.open;
    }),
  )
  .handleAction(setVsAI, (state, { payload }) =>
    produce(state, (draft) => {
      draft.vsAI = payload.vsAI;
    }),
  )
  .handleAction(setAIMode, (state, { payload }) =>
    produce(state, (draft) => {
      draft.aiMode = payload.mode;
    }),
  )
  .handleAction(setXIsNext, (state, { payload }) =>
    produce(state, (draft) => {
      draft.xIsNext = payload.xIsNext;
    }),
  )
  .handleAction(setStepNumber, (state, { payload }) =>
    produce(state, (draft) => {
      draft.stepNumber = payload.step;
    }),
  )
  .handleAction(setBoard, (state, { payload }) =>
    produce(state, (draft) => {
      draft.board = payload.board;
    }),
  )
  .handleAction(setHistory, (state, { payload }) =>
    produce(state, (draft) => {
      draft.history = payload.history;
    }),
  );
