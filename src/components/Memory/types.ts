export interface Values {
  options: number;
  name: string;
}

export interface MessageProps {
  name: string;
  score: number;
  handleReplay: () => void;
  handleReset: () => void;
}
