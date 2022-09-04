import { ActionType } from 'typesafe-actions';
import { AIMode, Coordinates } from '../../types';
import {
  increaseSnake,
  makeMove,
  scoreUpdates,
  setDisDirection,
  setInPlay,
  setMock,
  stopGame,
} from './actions';

export interface SnakeState {
  snake: Coordinates[];
  disallowedDirection: string;
  score: number;
  stopGame: boolean;
  mock: Coordinates;
  inPlay: boolean;
}

export type SnakeActions =
  | ActionType<typeof makeMove>
  | ActionType<typeof setDisDirection>
  | ActionType<typeof stopGame>
  | ActionType<typeof increaseSnake>
  | ActionType<typeof scoreUpdates>
  | ActionType<typeof setMock>
  | ActionType<typeof setInPlay>;
