import { ActionType } from 'typesafe-actions';
import { Coordinates } from '../../types';
import {
  handleTreatConsumed,
  makeMove,
  scoreUpdates,
  setDisDirection,
  setInPlay,
  generateTreat,
  stopGame,
  resetGame,
} from './actions';

export interface SnakeState {
  snake: Coordinates[];
  disallowedDirection: string;
  score: number;
  stopGame: boolean;
  treat: Coordinates;
  inPlay: boolean;
  consumedTreats: Coordinates[];
}

export type SnakeActions =
  | ActionType<typeof makeMove>
  | ActionType<typeof setDisDirection>
  | ActionType<typeof stopGame>
  | ActionType<typeof handleTreatConsumed>
  | ActionType<typeof scoreUpdates>
  | ActionType<typeof generateTreat>
  | ActionType<typeof setInPlay>
  | ActionType<typeof resetGame>;
