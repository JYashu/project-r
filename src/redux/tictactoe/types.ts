import { ActionType } from 'typesafe-actions';
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

export interface TicTacToeState {
  open: boolean;
  vsAI: boolean;
  aiMode: AIMode;
  xIsNext: boolean;
  stepNumber: number;
  board: any;
  history: any;
}

export type TicTacToeActions =
  | ActionType<typeof setOpen>
  | ActionType<typeof setVsAI>
  | ActionType<typeof setAIMode>
  | ActionType<typeof setXIsNext>
  | ActionType<typeof setStepNumber>
  | ActionType<typeof setBoard>
  | ActionType<typeof setHistory>;
