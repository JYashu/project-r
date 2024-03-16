/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { generateRandomPosition } from '../../utils/snakeUtils';
import {
  increaseSnake,
  makeMove,
  scoreUpdates,
  setDisDirection,
  setInPlay,
  setMock,
  stopGame,
} from './actions';
import { SnakeState, SnakeActions } from './types';

const initialState: SnakeState = {
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: '',
  score: 0,
  stopGame: false,
  mock: generateRandomPosition(980, 580, [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ]),
  inPlay: false,
};

export default createReducer<SnakeState, SnakeActions>(initialState)
  .handleAction(makeMove, (state, { payload }) =>
    produce(state, (draft) => {
      if (!draft.stopGame) {
        let newSnake = [...state.snake];
        newSnake = [
          {
            x: state.snake[0].x + payload.dx,
            y: state.snake[0].y + payload.dy,
          },
          ...newSnake,
        ];
        newSnake.pop();

        draft.snake = [...newSnake];
        switch (payload.direction) {
          case 'RIGHT':
            draft.disallowedDirection = 'LEFT';
            break;
          case 'LEFT':
            draft.disallowedDirection = 'RIGHT';
            break;
          case 'UP':
            draft.disallowedDirection = 'DOWN';
            break;
          case 'DOWN':
            draft.disallowedDirection = 'UP';
            break;
          default:
            break;
        }
      }
    }),
  )
  .handleAction(setDisDirection, (state, { payload }) =>
    produce(state, (draft) => {
      draft.disallowedDirection = payload.direction;
    }),
  )
  .handleAction(increaseSnake, (state) =>
    produce(state, (draft) => {
      const snakeLen = state.snake.length;
      draft.snake = [
        ...state.snake,
        {
          x: state.snake[snakeLen - 1].x - 20,
          y: state.snake[snakeLen - 1].y - 20,
        },
      ];
    }),
  )
  .handleAction(scoreUpdates, (state, { payload }) =>
    produce(state, (draft) => {
      if (payload.reset) draft.score = 0;
      else draft.score += 1;
    }),
  )
  .handleAction(stopGame, (state) =>
    produce(state, (draft) => {
      draft.stopGame = true;
    }),
  )
  .handleAction(setMock, (state) =>
    produce(state, (draft) => {
      draft.mock = generateRandomPosition(980, 580, draft.snake);
    }),
  )
  .handleAction(setInPlay, (state, { payload }) =>
    produce(state, (draft) => {
      draft.inPlay = payload.inPlay;
    }),
  );
