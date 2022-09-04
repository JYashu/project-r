import { AIMode } from '../types';
import { WINNING_LINES } from './consts';

export function isPlayerWinning(board: any, player: any, WINNING_LINES: any) {
  for (let i = 0; i < WINNING_LINES.length; i += 1) {
    const [a, b, c] = WINNING_LINES[i];
    if (board[a] === player && board[b] === player && !board[c]) {
      return c;
    } else if (board[a] === player && board[c] === player && !board[b]) {
      return b;
    } else if (board[b] === player && board[c] === player && !board[a]) {
      return a;
    }
  }

  return null;
}

export const computerPlay = (board: any, mode: AIMode) => {
  // TODO: Code for difficult mode
  const emptySquares = getEmptySquares(board);
  if (emptySquares.length < 2) {
    return board;
  }
  let computerMove;
  if (mode === 'easy') {
    computerMove = isPlayerWinning(board, 'O', WINNING_LINES);
    if (!computerMove) {
      const rand = Math.floor(Math.random() * emptySquares.length);
      computerMove = emptySquares[rand];
    }
  } else {
    computerMove = isPlayerWinning(board, 'O', WINNING_LINES);
    if (!computerMove) {
      computerMove = isPlayerWinning(board, 'X', WINNING_LINES);
    }
    if (!computerMove) {
      const rand = Math.floor(Math.random() * emptySquares.length);
      computerMove = emptySquares[rand];
    }
  }
  board[computerMove] = 'O';
  return board;
};

export function findWinner(board: any) {
  for (let i = 0; i < WINNING_LINES.length; i += 1) {
    const [a, b, c] = WINNING_LINES[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export function getEmptySquares(board: any) {
  const emptySquares = [];
  for (let i = 0; i < 9; i += 1) {
    if (board[i] === null) {
      emptySquares.push(i);
    }
  }
  return emptySquares;
}
