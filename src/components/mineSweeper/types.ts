export interface CellValues {
  id: string;
  value: number;
  revealed: boolean;
  row: number;
  column: number;
  flagged: boolean;
  clickedMine: boolean;
}

export enum ActionType {
  FLAG = 'FLAG',
  REVEAL = 'REVEAL',
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
  CUSTOM = 'custom',
}

export interface Config {
  boardRows: number;
  boardColumns: number;
  boardMines: number;
}
