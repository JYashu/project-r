import { CellValues } from '../components/mineSweeper/types';
import { distance, getUniqueId } from './helpers';

/**
 * Random function used for generating random value of x & y
 *
 * @param {number} max Upper limit to be produced
 * @param {number} min Lower limit to be produced
 * @returns {number}
 */
const random = (max: number, min: number = 0): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Function to get a Random position to place a Bomb
 *
 * @param {number} rows Number of rows in the Board
 * @param {number} columns Number of columns in the Board
 * @returns {{x: number; y: number}} Co-ordinates of a random position within the Board
 */
const getRandomBombPosition = (rows: number, columns: number): { x: number; y: number } => {
  const x = random(rows - 1);
  const y = random(columns - 1);

  return { x, y };
};

/**
 * Checks if the position {x, y} is touching border with clicked cell.
 *
 * @param {number} x The row number of the cell where we are attempting to place Bomb
 * @param {number} y The column number of the cell where we are attempting to place Bomb
 * @param {number} px The row number of the cell which was clicked
 * @param {number} py The column number of the cell which was clicked
 * @returns {boolean} Return true if the cell at {x, y} position is not touching the clicked cell
 */
const notInInvalidGrid = (x: number, y: number, px: number, py: number): boolean => {
  if (x === px - 1 && (y === py - 1 || y === py || y === py + 1)) {
    return false;
  }
  if (x === px && (y === py - 1 || y === py || y === py + 1)) {
    return false;
  }
  if (x === px + 1 && (y === py - 1 || y === py || y === py + 1)) {
    return false;
  }
  return true;
};

export const createBoard = (rows: number, cols: number, bombs: number, px: number, py: number) => {
  // Board for storing the values for each cell
  const board = [];
  // Tracking the mine-location
  const mineLocation = [];
  // Create blank board

  for (let row = 0; row < rows; row += 1) {
    const subCol = [];
    for (let column = 0; column < cols; column += 1) {
      subCol.push({
        id: getUniqueId(),
        value: 0,
        revealed: false,
        row,
        column,
        flagged: false,
        clickedMine: false,
      });
    }
    board.push(subCol);
  }

  // Randomize Bomb Placement
  let bombsCount = 0;
  while (bombsCount < bombs) {
    // Implementing random function
    const { x, y } = getRandomBombPosition(rows, cols);

    // placing bomb at random location(x,y) on board[x][y]
    if (notInInvalidGrid(x, y, px, py) && board[x][y].value === 0) {
      board[x][y].value = -1;
      mineLocation.push([x, y]);
      bombsCount += 1;
    }
  }

  // Increasing the value of specific cell
  // If the cell has mines increasing the cell value by 1.
  // Add Numbers
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (board[i][j].value !== -1) {
        // Top
        if (i > 0 && board[i - 1][j].value === -1) {
          board[i][j].value += 1;
        }

        // Top Right
        if (i > 0 && j < cols - 1 && board[i - 1][j + 1].value === -1) {
          board[i][j].value += 1;
        }

        // Right
        if (j < cols - 1 && board[i][j + 1].value === -1) {
          board[i][j].value += 1;
        }

        // Bottom Right
        if (i < rows - 1 && j < cols - 1 && board[i + 1][j + 1].value === -1) {
          board[i][j].value += 1;
        }

        // Bottom
        if (i < rows - 1 && board[i + 1][j].value === -1) {
          board[i][j].value += 1;
        }

        // Bottom Left
        if (i < rows - 1 && j > 0 && board[i + 1][j - 1].value === -1) {
          board[i][j].value += 1;
        }

        // LEft
        if (j > 0 && board[i][j - 1].value === -1) {
          board[i][j].value += 1;
        }

        // Top Left
        if (i > 0 && j > 0 && board[i - 1][j - 1].value === -1) {
          board[i][j].value += 1;
        }
      }
    }
  }
  return { board, mineLocation };
};

export const revealed = (arr: any[][], x: number, y: number, nonMines: number) => {
  // all the cells which are adjacent to zero must be stored in the array
  // so that it can be revealed later
  const newArr = JSON.parse(JSON.stringify(arr));
  let newNonMines = nonMines;

  const coords = [];
  const show = [];
  show.push(newArr[x][y]);
  while (show.length !== 0) {
    const one: CellValues = show.pop();
    const i = one.row;
    const j = one.column;
    if (!one.revealed) {
      newNonMines -= 1;
      coords.push([i, j]);
      one.revealed = true;
    }
    if (one.value !== 0) {
      break;
    }

    // top left

    if (i > 0 && j > 0 && newArr[i - 1][j - 1].value === 0 && !newArr[i - 1][j - 1].revealed) {
      show.push(newArr[i - 1][j - 1]);
    }

    // bottom right

    if (
      i < newArr.length - 1 &&
      j < newArr[0].length - 1 &&
      newArr[i + 1][j + 1].value === 0 &&
      !newArr[i + 1][j + 1].revealed
    ) {
      show.push(newArr[i + 1][j + 1]);
    }

    // top right

    if (
      i > 0 &&
      j < newArr[0].length - 1 &&
      newArr[i - 1][j + 1].value === 0 &&
      !newArr[i - 1][j + 1].revealed
    ) {
      show.push(newArr[i - 1][j + 1]);
    }

    // bottom left

    if (
      i < newArr.length - 1 &&
      j > 0 &&
      newArr[i + 1][j - 1].value === 0 &&
      !newArr[i + 1][j - 1].revealed
    ) {
      show.push(newArr[i + 1][j - 1]);
    }

    // top
    if (i > 0 && newArr[i - 1][j].value === 0 && !newArr[i - 1][j].revealed) {
      show.push(newArr[i - 1][j]);
    }

    // right

    if (j < newArr[0].length - 1 && newArr[i][j + 1].value === 0 && !newArr[i][j + 1].revealed) {
      show.push(newArr[i][j + 1]);
    }

    // bottom

    if (i < newArr.length - 1 && newArr[i + 1][j].value === 0 && !newArr[i + 1][j].revealed) {
      show.push(newArr[i + 1][j]);
    }

    // left

    if (j > 0 && newArr[i][j - 1].value === 0 && !newArr[i][j - 1].revealed) {
      show.push(newArr[i][j - 1]);
    }

    // start revealing the item

    if (i > 0 && j > 0 && !newArr[i - 1][j - 1].revealed) {
      // Top Left Reveal

      newArr[i - 1][j - 1].revealed = true;
      coords.push([i - 1, j - 1]);
      newNonMines -= 1;
    }

    if (j > 0 && !newArr[i][j - 1].revealed) {
      // Left Reveal
      newArr[i][j - 1].revealed = true;
      coords.push([i, j - 1]);
      newNonMines -= 1;
    }

    if (i < newArr.length - 1 && j > 0 && !newArr[i + 1][j - 1].revealed) {
      // Bottom Left Reveal
      newArr[i + 1][j - 1].revealed = true;
      coords.push([i + 1, j - 1]);
      newNonMines -= 1;
    }

    if (i > 0 && !newArr[i - 1][j].revealed) {
      // Top Reveal
      newArr[i - 1][j].revealed = true;
      coords.push([i - 1, j]);
      newNonMines -= 1;
    }

    if (i < newArr.length - 1 && !newArr[i + 1][j].revealed) {
      // Bottom Reveal
      newArr[i + 1][j].revealed = true;
      coords.push([i + 1, j]);
      newNonMines -= 1;
    }

    if (i > 0 && j < newArr[0].length - 1 && !newArr[i - 1][j + 1].revealed) {
      // Top Right Reveal
      newArr[i - 1][j + 1].revealed = true;
      coords.push([i - 1, j + 1]);
      newNonMines -= 1;
    }

    if (j < newArr[0].length - 1 && !newArr[i][j + 1].revealed) {
      // Right Reveal
      newArr[i][j + 1].revealed = true;
      coords.push([i, j + 1]);
      newNonMines -= 1;
    }

    if (i < newArr.length - 1 && j < newArr[0].length - 1 && !newArr[i + 1][j + 1].revealed) {
      // Bottom Right Reveal
      newArr[i + 1][j + 1].revealed = true;
      coords.push([i + 1, j + 1]);
      newNonMines -= 1;
    }
  }

  return { coords: coords.sort((a, b) => distance(a, [x, y]) - distance(b, [x, y])), newNonMines };
};
