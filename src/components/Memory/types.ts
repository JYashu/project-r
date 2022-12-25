import { CardTheme } from './const';

export interface Values {
  options: number;
  name: string;
  theme: CardTheme;
}

export interface MessageProps {
  name: string;
  score: number;
  handleReplay: () => void;
  handleReset: () => void;
}
