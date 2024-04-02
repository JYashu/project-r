/* eslint-disable no-param-reassign */
import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import {
  findDigestedTreat,
  generateNewSnake,
  generateRandomPosition,
} from '../../utils/snakeUtils';
import {
  generateTreat,
  handleTreatConsumed,
  makeMove,
  resetGame,
  scoreUpdates,
  setDisDirection,
  setInPlay,
  stopGame,
} from './actions';
import { SnakeState, SnakeActions } from './types';

const initialState: SnakeState = {
  snake: [{ x: 0, y: 0 }],
  disallowedDirection: '',
  score: 0,
  stopGame: false,
  treat: generateRandomPosition(1008, 608, [{ x: 0, y: 0 }]),
  inPlay: false,
  consumedTreats: [],
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
        const index = findDigestedTreat(newSnake[newSnake.length - 1], state.consumedTreats);
        if (index !== -1) {
          const newTreats = [...state.consumedTreats];
          newTreats.splice(index, 1);
          draft.consumedTreats = [...newTreats];
        } else {
          newSnake.pop();
        }

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
  .handleAction(handleTreatConsumed, (state, { payload }) =>
    produce(state, (draft) => {
      draft.consumedTreats = [...state.consumedTreats, payload.treat];
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
  .handleAction(generateTreat, (state, { payload }) =>
    produce(state, (draft) => {
      draft.treat = generateRandomPosition(payload.width, payload.height, draft.snake);
    }),
  )
  .handleAction(setInPlay, (state, { payload }) =>
    produce(state, (draft) => {
      draft.inPlay = payload.inPlay;
    }),
  )
  .handleAction(resetGame, (state, { payload }) =>
    produce(state, (draft) => {
      draft.score = 0;
      draft.stopGame = false;
      draft.inPlay = false;
      draft.snake = generateNewSnake(payload.width, payload.height);
      draft.consumedTreats = [];
      draft.treat = generateRandomPosition(payload.width, payload.height, draft.snake);
      draft.disallowedDirection = '';
    }),
  );
