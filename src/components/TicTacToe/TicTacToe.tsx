import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import Board from '../board';
import { findWinner, computerPlay } from '../../utils/tictactoeUtils';
import { TicTacToeState } from '../../redux/tictactoe';
import scssObj from './_TicTacToe.scss';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import Button from '../../elements/button';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import { ActiveSidebarItem, AIMode } from '../../types';
import RadioButton from '../../elements/radioButton/RadioButton';
import useOutsideClick from '../../hooks/useOutsideClick';

interface Props {
  gameState: TicTacToeState;
  setOpen: () => void;
  setXIsNext: (xIsNext: boolean) => unknown;
  setStepNumber: (step: number) => unknown;
  setBoard: (board: any) => unknown;
  setHistory: (history: any) => unknown;
  setVsAI: (vsAI: boolean) => void;
  setAIMode: (mode: AIMode) => void;
}

interface ModeProps {
  vsAI: boolean;
  aiMode: AIMode;
  open: boolean;
  restart: () => void;
  setOpen: () => void;
  setShowDifficulty: () => void;
  setVsAI: (vsAI: boolean) => any;
}

interface StatusProps {
  gameState: TicTacToeState;
  showDifficulty: boolean;
  restart: () => void;
  setOpen: () => void;
  setShowDifficulty: () => void;
  setXIsNext: (xIsNext: boolean) => unknown;
  setStepNumber: (step: number) => unknown;
  setBoard: (board: any) => unknown;
  setHistory: (history: any) => unknown;
}

interface SecondaryProps {
  open: boolean;
  showDifficulty: boolean;
  aiMode: AIMode;
  setAIMode: (mode: AIMode) => void;
  moves: JSX.Element[];
  toggleShowDifficulty: () => void;
  setOpen: () => void;
}

const Status = ({
  gameState,
  setOpen,
  restart,
  setXIsNext,
  setStepNumber,
  setBoard,
  setHistory,
  showDifficulty,
  setShowDifficulty,
}: StatusProps) => {
  const { xIsNext, vsAI, stepNumber, board, history } = gameState;

  const winner = findWinner(board);

  const undo = () => {
    if (stepNumber !== 0) {
      setStepNumber(stepNumber - 1);
      const boardCopy = history[stepNumber - 1];
      setBoard(boardCopy);
      setBoard(history[stepNumber - 1]);
      if (!vsAI) {
        setXIsNext(!xIsNext);
      }
      setHistory(history.slice(0, stepNumber));
    }
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className={`${scssObj.baseClass}__info`}>
      <h2 className={`${scssObj.baseClass}__status`}>{status}</h2>
      <Button buttonStyle="game" size="small" onClick={() => restart()}>
        Restart
      </Button>
      <Button
        buttonStyle="game"
        size="small"
        onClick={() => {
          setOpen();
          if (showDifficulty) setShowDifficulty();
        }}
      >
        Jump To
      </Button>
      <Button buttonStyle="game" size="small" onClick={() => undo()}>
        Undo
      </Button>
    </div>
  );
};

const Mode = ({ vsAI, open, aiMode, restart, setShowDifficulty, setVsAI, setOpen }: ModeProps) => {
  const mode = vsAI ? 'Player v/s AI' : 'Player v/s Player';
  const AI = 'Change Mode';

  return (
    <div className={`${scssObj.baseClass}__mode-info`}>
      <h2 className="status">{mode}</h2>
      <Button
        buttonStyle="game"
        size="small"
        onClick={() => {
          restart();
          setVsAI(!vsAI);
        }}
      >
        {AI}
      </Button>
      {vsAI && (
        <Button
          buttonStyle="game"
          size="small"
          onClick={() => {
            setShowDifficulty();
            if (open) {
              setOpen();
            }
          }}
        >
          {aiMode}
        </Button>
      )}
    </div>
  );
};

const SecondaryActions = ({
  open,
  showDifficulty,
  aiMode,
  setAIMode,
  moves,
  toggleShowDifficulty,
  setOpen,
}: SecondaryProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(() => {
    if (showDifficulty) {
      toggleShowDifficulty();
    }
    if (open) {
      setOpen();
    }
  }, ref);

  return (
    <div>
      {(open || showDifficulty) && (
        <div className={`${scssObj.baseClass}__secondary-actions-wrapper`}>
          {open ? (
            <div ref={ref} className={`${scssObj.baseClass}__secondary-actions`}>
              {moves}
            </div>
          ) : (
            <>
              {showDifficulty && (
                <div ref={ref} className={`${scssObj.baseClass}__secondary-actions`}>
                  <div className={`${scssObj.baseClass}__card`}>
                    <div className="card one move">Mode: {aiMode}</div>
                    <div className="card two move">
                      <RadioButton
                        label={AIMode.Hard}
                        checked={aiMode === AIMode.Hard}
                        onChange={() => {
                          setAIMode(AIMode.Hard);
                        }}
                      />
                    </div>
                    <div className="card three move">
                      <RadioButton
                        label={AIMode.Easy}
                        checked={aiMode === AIMode.Easy}
                        onChange={() => {
                          setAIMode(AIMode.Easy);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const TicTacToe = ({
  gameState,
  setOpen,
  setXIsNext,
  setStepNumber,
  setBoard,
  setHistory,
  setVsAI,
  setAIMode,
}: Props) => {
  const { board, history, vsAI, aiMode, xIsNext, open } = gameState;
  const currentHistory = history;
  const [showDifficulty, setShowDifficulty] = useState(false);
  useSetGlobalHeader('Tic Tac Toe');

  useActiveSidebarItem(ActiveSidebarItem.TicTacToe);

  const toggleShowDifficulty = () => {
    setTimeout(() => setShowDifficulty(!showDifficulty), 100);
  };

  const restart = () => {
    const emptyBoard = Array(9).fill(null);
    setBoard(emptyBoard);
    setHistory([]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const handleClick = (i: number) => {
    const boardCopy = [...board];
    if (findWinner(boardCopy) || boardCopy[i]) {
      return;
    }
    boardCopy[i] = xIsNext ? 'X' : 'O';
    if (vsAI) {
      if (!findWinner(boardCopy)) {
        computerPlay(boardCopy, aiMode);
      }
    }

    setHistory(history.concat([boardCopy]));
    setBoard(boardCopy);
    setStepNumber(history.length);
    setXIsNext(vsAI ? xIsNext : !xIsNext);
  };

  const winner = findWinner(board);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  let name = 'Tic-Tac-Toe';

  if (winner || !vsAI) {
    name = `${name} | ${status}`;
  } else name += vsAI ? ' | v/s AI' : ' | v/s Player';

  const jumpTo = (step: number) => {
    setBoard(history[step]);
    setStepNumber(step);
    if (!vsAI) setXIsNext(step % 2 !== 0);
    setOpen();
  };

  const moves = [];

  if (currentHistory.length > 0) {
    for (let i = 0; i < currentHistory.length; i += 1) {
      const desc = `Go to move #${i + 1}`;
      moves.push(
        <div key={uuidv4()}>
          <Button
            buttonStyle="game"
            size="small"
            className={`${scssObj.baseClass}__btn move`}
            onClick={() => jumpTo(i)}
          >
            {desc}
          </Button>
        </div>,
      );
    }
  } else
    moves.push(
      <div key={uuidv4()}>
        <Button
          buttonStyle="game"
          size="small"
          className={`${scssObj.baseClass}__btn move`}
          onClick={() => setOpen()}
        >
          Start Playing
        </Button>
      </div>,
    );

  return (
    <div className={`${scssObj.baseClass}`}>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className={`${scssObj.baseClass}__game`}>
        <h1>Tic-Tac-Toe</h1>
        <div className={`${scssObj.baseClass}__game-board`}>
          <Board
            squares={board}
            onClick={(i) => {
              handleClick(i);
            }}
          />
        </div>
        <div className={`${scssObj.baseClass}__status-info`}>
          <Status
            gameState={gameState}
            restart={restart}
            showDifficulty={showDifficulty}
            setOpen={setOpen}
            setXIsNext={setXIsNext}
            setStepNumber={setStepNumber}
            setBoard={setBoard}
            setHistory={setHistory}
            setShowDifficulty={() => toggleShowDifficulty()}
          />
        </div>
        <Mode
          setShowDifficulty={() => toggleShowDifficulty()}
          vsAI={vsAI}
          open={open}
          aiMode={aiMode}
          restart={restart}
          setVsAI={setVsAI}
          setOpen={setOpen}
        />
      </div>
      {(open || showDifficulty) && (
        <SecondaryActions
          open={open}
          showDifficulty={showDifficulty}
          aiMode={aiMode}
          setAIMode={setAIMode}
          setOpen={setOpen}
          toggleShowDifficulty={toggleShowDifficulty}
          moves={moves}
        />
      )}
    </div>
  );
};

export default TicTacToe;
