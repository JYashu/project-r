import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../elements/button';
import ToggleBar from '../../elements/toggleBar';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { ActiveSidebarItem } from '../../types';
import { ASSETS_BASE_URL } from '../../utils/assets';
import { KeyCodes } from '../../utils/consts';
import { distance, getUniqueId } from '../../utils/helpers';
import { createBoard, revealed } from '../../utils/mineSweeperUtils';
import Cell from './Cell';
import { CONFIG } from './const';
import { Difficulty, ActionType, CellValues } from './types';
import scssObj from './_MineSweeper.scss';

const MineSweeper = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.INTERMEDIATE);
  const [config, setConfig] = useState(CONFIG[difficulty]);
  const [actionType, setActionType] = useState(ActionType.REVEAL);
  const [grid, setGrid] = useState<CellValues[][]>();
  const [nonMineCount, setNonMineCount] = useState(-1);
  const [mineCount, setMineCount] = useState(0);
  const [mineLocation, setMineLocation] = useState<number[][]>();
  const [inPlay, setInPlay] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [primaryButton, setPrimaryButton] = useState('smile');

  useSetGlobalHeader(Pages.MINE_SWEEPER);
  useActiveSidebarItem(ActiveSidebarItem.MineSweeper);

  useEffect(() => {
    setConfig(CONFIG[difficulty]);
  }, [difficulty]);

  useKeyboardShortcut(() => {
    if (actionType === ActionType.REVEAL) setActionType(ActionType.FLAG);
    else setActionType(ActionType.REVEAL);
  }, KeyCodes.SPACE);

  useEffect(() => {
    for (let i = -1; i < 9; i += 1) {
      const img = new Image();
      img.src = `${ASSETS_BASE_URL}/minesweeper/${i}.png`;
      img.onload = () => {};
    }
    const img = new Image();
    img.src = `${ASSETS_BASE_URL}/minesweeper/flag.png`;
    img.onload = () => {};
    img.src = `${ASSETS_BASE_URL}/minesweeper/smile.png`;
    img.onload = () => {};
    img.src = `${ASSETS_BASE_URL}/minesweeper/happy.png`;
    img.onload = () => {};
    img.src = `${ASSETS_BASE_URL}/minesweeper/dead.png`;
    img.onload = () => {};
  }, []);

  const initializeGame = () => {
    setPrimaryButton('smile');
    const board = [];
    // Create empty board
    for (let row = 0; row < config.boardRows; row += 1) {
      const subCol = [];
      for (let column = 0; column < config.boardColumns; column += 1) {
        subCol.push({
          id: getUniqueId(),
          value: 9,
          revealed: false,
          row,
          column,
          flagged: false,
          clickedMine: false,
        });
      }
      board.push(subCol);
    }
    setGrid(board);
    setNonMineCount(config.boardRows * config.boardColumns - config.boardMines);
    setMineCount(config.boardMines);
    setGameStarted(false);
    setInPlay(true);
  };

  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  useEffect(() => {
    if (!nonMineCount && mineLocation) {
      // alert('you won');
      const copyGrid = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < mineLocation.length; i += 1) {
        copyGrid[mineLocation[i][0]][mineLocation[i][1]].flagged = true;
      }
      setGrid(copyGrid);
      setInPlay(false);
      setPrimaryButton('happy');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonMineCount]);

  const sortMineLocations = (x: number, y: number) => {
    setMineLocation(
      (prev) => prev && prev.sort((a, b) => distance(a, [x, y]) - distance(b, [x, y])),
    );
  };

  const revealAllMines = (x: number, y: number, newGrid: CellValues[][]) => {
    if (!mineLocation) return;
    const copyGrid: CellValues[][] = JSON.parse(JSON.stringify(newGrid));
    copyGrid[x][y].clickedMine = true;
    copyGrid[x][y].revealed = true;
    sortMineLocations(x, y);
    let i = 0;
    const revealMines = setInterval(() => {
      if (i >= mineLocation.length - 2) {
        clearInterval(revealMines);
      }
      copyGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;

      if (i <= mineLocation.length - 2)
        copyGrid[mineLocation[i + 1][0]][mineLocation[i + 1][1]].revealed = true;

      setGrid(() => JSON.parse(JSON.stringify(copyGrid)));
      i += 2;
    }, 2);
  };

  const revealAllBlanks = (
    newGrid: CellValues[][],
    revealedBoard: { coords: number[][]; newNonMines: number },
  ) => {
    const copyGrid: CellValues[][] = JSON.parse(JSON.stringify(newGrid));
    let i = 0;
    const revealCells = setInterval(() => {
      if (i >= revealedBoard.coords.length - 3) {
        clearInterval(revealCells);
      }
      copyGrid[revealedBoard.coords[i][0]][revealedBoard.coords[i][1]].revealed = true;

      if (i <= revealedBoard.coords.length - 2)
        copyGrid[revealedBoard.coords[i + 1][0]][revealedBoard.coords[i + 1][1]].revealed = true;

      if (i <= revealedBoard.coords.length - 3)
        copyGrid[revealedBoard.coords[i + 2][0]][revealedBoard.coords[i + 2][1]].revealed = true;

      setGrid(() => JSON.parse(JSON.stringify(copyGrid)));

      i += 3;
    }, 1);
  };

  const handleRevealCell = (x: number, y: number, newGrid?: CellValues[][]) => {
    if (!newGrid) return;
    if (newGrid[x][y].value === -1 && mineLocation) {
      setInPlay(false);
      setPrimaryButton('dead');
      revealAllMines(x, y, newGrid);
    } else {
      const revealedBoard = revealed(newGrid, x, y, nonMineCount);
      revealAllBlanks(newGrid, revealedBoard);
      setNonMineCount(revealedBoard.newNonMines);
    }
  };

  const revealCell = (x: number, y: number) => {
    if (grid && grid[x][y].flagged && actionType === ActionType.REVEAL) return;
    if (grid && grid[x][y].value === 9) {
      const newBoard = createBoard(config.boardRows, config.boardColumns, config.boardMines, x, y);
      setMineLocation(newBoard.mineLocation);
      setGameStarted(true);
      handleRevealCell(x, y, newBoard.board);
    } else {
      handleRevealCell(x, y, grid);
    }
  };

  const flagCell = (x: number, y: number) => {
    if (grid && grid[x][y].revealed) return;

    const newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].flagged) {
      newGrid[x][y].flagged = false;
      setMineCount((prev) => prev + 1);
    } else {
      newGrid[x][y].flagged = true;
      setMineCount((prev) => prev - 1);
    }
    setGrid(newGrid);
  };

  const handleSecondaryClick = (e: any, x: number, y: number) => {
    e.preventDefault();

    if (!inPlay) return;

    if (actionType === ActionType.REVEAL && gameStarted) {
      flagCell(x, y);
    } else {
      revealCell(x, y);
    }
  };

  const handlePrimaryClick = (e: any, x: number, y: number) => {
    e.preventDefault();

    if (!inPlay) return;

    if (actionType === ActionType.REVEAL || !gameStarted) {
      revealCell(x, y);
    } else {
      flagCell(x, y);
    }
  };

  const renderFocus = () => <div className={`${scssObj.baseClass}__focus`} />;

  return (
    <div className={scssObj.baseClass}>
      <Helmet>
        <title>Minesweeper</title>
        <meta name="title" content="Minesweeper | JYashu" />
        <meta name="description" content="Play Free Minesweeper Online" />
        <link rel="icon" href={`${ASSETS_BASE_URL}/minesweeper/icon.png`} />
      </Helmet>
      <div style={{ color: 'white', textAlign: 'center', fontSize: '35px' }}>
        Mines : {mineCount}
      </div>

      <div className={`${scssObj.baseClass}__container`}>
        <div className={`${scssObj.baseClass}__menu`}>
          <div className={`${scssObj.baseClass}__toggle-wrapper`}>
            <ToggleBar
              className={`${scssObj.baseClass}__toggle`}
              setFieldValue={(value: ActionType) => {
                setActionType(value);
              }}
              options={[
                {
                  label: (
                    <img
                      height={18}
                      width={18}
                      alt="mine"
                      src={`${ASSETS_BASE_URL}/minesweeper/-1.png`}
                      title="Reveal Cell (Press Space To Switch)"
                    />
                  ),
                  value: ActionType.REVEAL,
                  id: getUniqueId(),
                },
                {
                  label: (
                    <img
                      height={18}
                      width={18}
                      alt="mine"
                      src={`${ASSETS_BASE_URL}/minesweeper/flag.png`}
                      title="Flag Cell (Press Space To Switch)"
                    />
                  ),
                  value: ActionType.FLAG,
                  id: getUniqueId(),
                },
              ]}
              focusValues={[0, 30]}
              focusWidth="30px"
              focusHeight="30px"
              value={actionType}
              renderFocus={renderFocus}
              title="Shortcut: Space"
            />
          </div>

          <div className={`${scssObj.baseClass}__button-wrapper`}>
            <Button
              className={`${scssObj.baseClass}__button`}
              buttonStyle="minesweeper"
              onClick={initializeGame}
            >
              <img
                height={22}
                width={22}
                alt={primaryButton}
                src={`${ASSETS_BASE_URL}/minesweeper/${primaryButton}.png`}
              />
            </Button>
          </div>
        </div>
        <div className={`${scssObj.baseClass}__content`}>
          <div className={`${scssObj.baseClass}__wrapper`}>
            {grid &&
              grid.map((row, index1) => {
                return (
                  <div className={`${scssObj.baseClass}__row`} key={`row-${row[0].id}`}>
                    {row.map((col, index2) => {
                      return (
                        <Cell
                          values={col}
                          key={col.id}
                          onPrimaryClick={handlePrimaryClick}
                          onSecondaryClick={handleSecondaryClick}
                          actionType={actionType}
                          inPlay={inPlay}
                          gameStarted={gameStarted}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>

        <div className={`${scssObj.baseClass}__footer`}>
          <Button
            className={`${scssObj.baseClass}__footer-button`}
            buttonStyle="minesweeper"
            isActive={difficulty === Difficulty.BEGINNER}
            onClick={() => setDifficulty(Difficulty.BEGINNER)}
          >
            Beginner
          </Button>
          <Button
            className={`${scssObj.baseClass}__footer-button`}
            buttonStyle="minesweeper"
            isActive={difficulty === Difficulty.INTERMEDIATE}
            onClick={() => setDifficulty(Difficulty.INTERMEDIATE)}
          >
            Intermediate
          </Button>
          <Button
            className={`${scssObj.baseClass}__footer-button`}
            buttonStyle="minesweeper"
            isActive={difficulty === Difficulty.EXPERT}
            onClick={() => setDifficulty(Difficulty.EXPERT)}
          >
            Expert
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MineSweeper;
