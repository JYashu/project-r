import { AIMode } from '../types';
import { WINNING_LINES } from './consts';

export const isPlayerWinning = (board: any, player: any) => {
  for (let i = 0; i < WINNING_LINES.length; i += 1) {
    const [a, b, c] = WINNING_LINES[i];
    if (board[a] === player && board[b] === player && !board[c]) {
      return c;
    }
    if (board[a] === player && board[c] === player && !board[b]) {
      return b;
    }
    if (board[b] === player && board[c] === player && !board[a]) {
      return a;
    }
  }

  return null;
};

export const getEmptySquares = (board: any) => {
  const emptySquares = [];
  for (let i = 0; i < 9; i += 1) {
    if (board[i] === null) {
      emptySquares.push(i);
    }
  }
  return emptySquares;
};

const countPossibleWinningLines = (board: any, player: any) => {
  let winningLinesCount = 0;
  for (let i = 0; i < WINNING_LINES.length; i += 1) {
    const [a, b, c] = WINNING_LINES[i];
    if (board[a] === player && board[b] === player && !board[c]) {
      winningLinesCount += 1;
    }
    if (board[a] === player && board[c] === player && !board[b]) {
      winningLinesCount += 1;
    }
    if (board[b] === player && board[c] === player && !board[a]) {
      winningLinesCount += 1;
    }
  }
  return winningLinesCount;
};

const isPlayerCreatingTwoWayFork = (board: any, player: any, emptySquares: number[]) => {
  const move = emptySquares.find((square) => {
    const newBoard = [...board];
    newBoard[square] = player;
    const winningLinesCount = countPossibleWinningLines(newBoard, player);
    return winningLinesCount > 1;
  });
  return move || null;
};

const isPlayerWinningNextMove = (
  board: any,
  player: any,
  emptySquares: number[],
  aIMode: AIMode,
) => {
  let moves: number[] = [];
  let linesCount = 1;
  emptySquares.forEach((square) => {
    const newBoard = [...board];
    newBoard[square] = player;
    const winningLinesCount = countPossibleWinningLines(newBoard, player);
    if (aIMode === AIMode.Moderate) {
      if (winningLinesCount > 0) {
        moves.push(square);
        linesCount = winningLinesCount;
      }
    } else if (winningLinesCount === linesCount) {
      moves.push(square);
    } else if (winningLinesCount > linesCount) {
      moves = [square];
      linesCount = winningLinesCount;
    }
  });
  return moves.length ? moves[Math.random() * moves.length] : null;
};

const getOpponent = (player: any) => {
  if (player === 'X') return 'O';
  return 'X';
};

const getPlayableMoves = (board: any, player: any, emptySquares: number[]) => {
  const playableMoves: number[] = [];
  for (let i = 0; i < emptySquares.length; i += 1) {
    const newBoard = [...board];
    newBoard[emptySquares[i]] = player;
    let lineCount = 0;
    const opponentMove = isPlayerWinning(newBoard, player);
    const newEmptySquares = opponentMove !== null ? [opponentMove] : getEmptySquares(newBoard);
    newEmptySquares.forEach((square) => {
      const newerBoard = [...board];
      newerBoard[square] = getOpponent(player);
      const winningLinesCount = countPossibleWinningLines(newerBoard, getOpponent(player));
      if (winningLinesCount > lineCount) {
        lineCount = winningLinesCount;
      }
    });
    if (lineCount < 2) {
      playableMoves.push(emptySquares[i]);
    }
  }
  return playableMoves.length > 0
    ? playableMoves.sort(() => Math.random() - 0.5)
    : emptySquares.sort(() => Math.random() - 0.5);
};

export const computerPlay = (board: any, mode: AIMode) => {
  // TODO: Code for difficult mode
  const emptySquares = getEmptySquares(board);
  if (emptySquares.length < 2) {
    return board;
  }
  let computerMove = null;
  if (mode === AIMode.Easy) {
    computerMove = isPlayerWinning(board, 'O');
    if (computerMove === null) {
      computerMove = isPlayerWinning(board, 'X');
    }
    if (computerMove === null) {
      const rand = Math.floor(Math.random() * emptySquares.length);
      computerMove = emptySquares[rand];
    }
  } else if (mode === AIMode.Moderate) {
    if (emptySquares.length === 8 && emptySquares.includes(4)) {
      computerMove = 4;
    }
    if (computerMove === null && emptySquares.length === 8) {
      computerMove = [0, 2, 6, 8][Math.floor(Math.random() * 4)];
    }
    if (computerMove === null) {
      computerMove = isPlayerWinning(board, 'O');
    }
    if (computerMove === null) {
      computerMove = isPlayerWinning(board, 'X');
    }
    if (computerMove === null) {
      computerMove = isPlayerWinningNextMove(board, 'O', emptySquares, mode);
    }
    if (computerMove === null) {
      const rand = Math.floor(Math.random() * emptySquares.length);
      computerMove = emptySquares[rand];
    }
  } else {
    if (emptySquares.length === 8 && emptySquares.includes(4)) {
      computerMove = 4;
    }
    if (computerMove === null && emptySquares.length === 8) {
      computerMove = [0, 2, 6, 8][Math.floor(Math.random() * 4)];
    }
    if (computerMove === null) {
      computerMove = isPlayerWinning(board, 'O');
    }
    if (computerMove === null) {
      computerMove = isPlayerWinning(board, 'X');
    }

    let playableMoves: number[] = [];
    if (computerMove === null) {
      playableMoves = getPlayableMoves(board, 'O', emptySquares);
    }
    if (computerMove === null) {
      computerMove = isPlayerCreatingTwoWayFork(board, '0', playableMoves);
    }
    if (computerMove === null) {
      computerMove = isPlayerWinningNextMove(board, 'O', playableMoves, mode);
    }
    if (computerMove === null) {
      const rand = Math.floor(Math.random() * playableMoves.length);
      computerMove = playableMoves[rand];
    }
  }
  board[computerMove] = 'O'; // eslint-disable-line
  return board;
};

export const findWinner = (board: any) => {
  for (let i = 0; i < WINNING_LINES.length; i += 1) {
    const [a, b, c] = WINNING_LINES[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};
