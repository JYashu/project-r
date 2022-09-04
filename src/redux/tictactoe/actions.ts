import { createAction } from 'typesafe-actions';
import { AIMode } from '../../types';

export const setVsAI = createAction('SET_VS_AI', action => (payload: { vsAI: boolean }) =>
  action(payload),
);

export const setAIMode = createAction('SET_AI_MODE', action => (payload: { mode: AIMode }) =>
  action(payload),
);

export const setOpen = createAction('SET_OPEN', action => () => action());

export const setXIsNext = createAction('SET_X_IS_NEXT', action => (payload: { xIsNext: boolean }) =>
  action(payload),
);

export const setStepNumber = createAction(
  'SET_STEP_NUMBER',
  action => (payload: { step: number }) => action(payload),
);

export const setBoard = createAction('SET_BOARD', action => (payload: { board: any }) =>
  action(payload),
);

export const setHistory = createAction('SET_HISTORY', action => (payload: { history: any }) =>
  action(payload),
);
