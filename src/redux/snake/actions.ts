import { createAction } from 'typesafe-actions';

export const makeMove = createAction(
  'MAKE_MOVE',
  action => (payload: { direction: string; dx: number; dy: number }) => action(payload),
);

export const setDisDirection = createAction(
  'SET_DIS_DIRECTION',
  action => (payload: { direction: any }) => action(payload),
);

export const stopGame = createAction('STOP_GAME', action => () => action());

export const increaseSnake = createAction('INCREASE_SNAKE', action => () => action());

export const scoreUpdates = createAction('SCORE_UPDATE', action => (payload: { reset?: boolean }) =>
  action(payload),
);

export const setMock = createAction('SET_MOCK', action => () => action());

export const setInPlay = createAction('SET_IN_PLAY', action => (payload: { inPlay: boolean }) =>
  action(payload),
);
