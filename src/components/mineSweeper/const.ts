import { Difficulty, Config } from './types';

export const CONFIG: { [id: string]: Config } = {
  [Difficulty.BEGINNER]: { boardRows: 16, boardColumns: 12, boardMines: 12 },
  [Difficulty.INTERMEDIATE]: { boardRows: 16, boardColumns: 16, boardMines: 40 },
  [Difficulty.EXPERT]: { boardRows: 16, boardColumns: 30, boardMines: 100 },
  [Difficulty.CUSTOM]: { boardRows: 1, boardColumns: 1, boardMines: 1 },
};
