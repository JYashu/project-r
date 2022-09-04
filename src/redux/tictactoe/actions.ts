import { createAction } from 'typesafe-actions';
import { AIMode } from '../../types';

export const setVsAI = createAction(
  'SET_VS_AI',
  (action) => (payload: { vsAI: boolean }) => action(payload)
);
// () => {
//   return (dispatch) => {
//     dispatch({
//       type: 'vsAI',
//     });
//   };
// };

export const setAIMode = createAction(
  'SET_AI_MODE',
  (action) => (payload: { mode: AIMode }) => action(payload)
);

export const setOpen = createAction('SET_OPEN', (action) => () => action());
// () => {
//   return (dispatch) => {
//     dispatch({
//       type: 'open',
//     });
//   };
// };

export const setXIsNext = createAction(
  'SET_X_IS_NEXT',
  (action) => (payload: { xIsNext: boolean }) => action(payload)
);
// (xIsNext) => {
//   return (dispatch) => {
//     dispatch({
//       type: 'xIsNext',
//       payload: xIsNext,
//     });
//   };
// };

export const setStepNumber = createAction(
  'SET_STEP_NUMBER',
  (action) => (payload: { step: number }) => action(payload)
);
// (step) => {
//   return (dispatch) => {
//     dispatch({
//       type: 'stepNumber',
//       payload: step,
//     });
//   };
// };

export const setBoard = createAction(
  'SET_BOARD',
  (action) => (payload: { board: any }) => action(payload)
);
// (board) => {
//   return (dispatch) => {
//     dispatch({
//       type: 'board',
//       payload: board,
//     });
//   };
// };

export const setHistory = createAction(
  'SET_HISTORY',
  (action) => (payload: { history: any }) => action(payload)
);
// (history) => {
//   return (dispatch) => {
//     dispatch({
//       type: 'history',
//       payload: history,
//     });
//   };
// };
