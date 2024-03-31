import { createAction } from 'typesafe-actions';
import { Coordinates } from '../../types';

export const makeMove = createAction(
  'MAKE_MOVE',
  (action) => (payload: { direction: string; dx: number; dy: number }) => action(payload),
);

export const setDisDirection = createAction(
  'SET_DIS_DIRECTION',
  (action) => (payload: { direction: any }) => action(payload),
);

export const stopGame = createAction('STOP_GAME', (action) => () => action());

export const handleTreatConsumed = createAction(
  'HANDLE_TREAT_CONSUMED',
  (action) => (payload: { treat: Coordinates }) => action(payload),
);

export const scoreUpdates = createAction(
  'SCORE_UPDATE',
  (action) => (payload: { reset?: boolean }) => action(payload),
);

export const generateTreat = createAction(
  'GENERATE_TREAT',
  (action) => (payload: { width: number; height: number }) => action(payload),
);

export const setInPlay = createAction(
  'SET_IN_PLAY',
  (action) => (payload: { inPlay: boolean }) => action(payload),
);

export const resetGame = createAction(
  'RESET_GAME',
  (action) => (payload: { width: number; height: number }) => action(payload),
);
