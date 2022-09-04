import Board from '../Board';
import { findWinner, computerPlay } from '../../utils/tictactoeUtils';
import { TicTacToeState } from '../../redux/tictactoe';
import { WINNING_LINES } from '../../utils/consts';
import scssObj from './_TicTacToe.scss';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { Helmet } from 'react-helmet';
import Button from '../Button';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import { ActiveSidebarItem, AIMode } from '../../types';
import RadioButton from '../RadioButton/RadioButton';

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
  setVsAI: (vsAI: boolean) => any;
  setAIMode: (mode: AIMode) => void;
}

interface StatusProps {
  gameState: TicTacToeState;
  setOpen: () => unknown;
  setXIsNext: (xIsNext: boolean) => unknown;
  setStepNumber: (step: number) => unknown;
  setBoard: (board: any) => unknown;
  setHistory: (history: any) => unknown;
}

const Status = ({
  gameState,
  setOpen,
  setXIsNext,
  setStepNumber,
  setBoard,
  setHistory,
}: StatusProps) => {
  const { open, xIsNext, vsAI, stepNumber, board, history } = gameState;

  const currentHistory = history;
  const winner = findWinner(board);

  const restart = () => {
    const emptyBoard = Array(9).fill(null);
    setBoard(emptyBoard);
    setHistory([emptyBoard]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const undo = () => {
    if (stepNumber !== 0) {
      setStepNumber(stepNumber - 1);
      const boardCopy = history[stepNumber - 1];
      setBoard(boardCopy);
      setBoard(history[stepNumber - 1]);
      if (vsAI) {
        // setXIsNext('X');
      } else {
        setXIsNext(!xIsNext);
      }
      setHistory(history.slice(0, stepNumber));
    }
  };

  const jumpTo = (step: number) => {
    setBoard(history[step]);
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = currentHistory.map((step: any, move: any) => {
    const desc = move ? 'Go to move #' + move : 'Go to start';
    return (
      <div key={move}>
        <Button
          style="game"
          size="small"
          className={`${scssObj.baseClass}__btn move`}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </Button>
      </div>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className={`${scssObj.baseClass}__info`}>
      <h2 className={`${scssObj.baseClass}__status`}>{status}</h2>
      <Button style="game" size="small" onClick={() => restart()}>
        Restart
      </Button>
      <Button style="game" size="small" onClick={() => setOpen()}>
        Jump To
      </Button>
      <Button style="game" size="small" onClick={() => undo()}>
        Undo
      </Button>
      {open && <ol>{moves}</ol>}
    </div>
  );
};

const Mode = ({ vsAI, aiMode, setVsAI, setAIMode }: ModeProps) => {
  const mode = vsAI ? 'Player v/s AI' : 'Player v/s Player';
  const AI = 'Change Mode';

  return (
    <div className="info">
      <h2 className="status">{mode}</h2>
      <Button
        style="game"
        size="small"
        onClick={() => {
          setVsAI(!vsAI);
        }}
      >
        {AI}
      </Button>
      {vsAI && (
        <div className={`${scssObj.baseClass}__card`}>
          <div className="card one move">Mode {aiMode}</div>
          <div className="card two move">
            <RadioButton
              label="Difficult"
              checked={aiMode === 'difficult'}
              onChange={() => {
                setAIMode(AIMode.Difficult);
              }}
            />
          </div>
          <div className="card three move">
            <RadioButton
              label="Easy"
              checked={aiMode === 'easy'}
              onChange={() => {
                setAIMode(AIMode.Easy);
              }}
            />
          </div>
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
  const { board, history, vsAI, aiMode, xIsNext } = gameState;

  useSetGlobalHeader('Tic Tac Toe');

  useActiveSidebarItem(ActiveSidebarItem.TicTacToe);

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
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  let name = 'Tic-Tac-Toe';
  // if (vsAI) {
  // }
  if (winner) {
    name = name + ' | ' + status;
  } else name = name + (vsAI ? ' | v/s AI' : ' | v/s Player');

  return (
    <div className={`${scssObj.baseClass}`}>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className={`${scssObj.baseClass}__info-wrapper`}>
        <div className={`${scssObj.baseClass}__title mob`}>
          <h1>Tic-Tac-Toe</h1>
        </div>
        <div className={`${scssObj.baseClass}__game-info`}>
          <Status
            gameState={gameState}
            setOpen={setOpen}
            setXIsNext={setXIsNext}
            setStepNumber={setStepNumber}
            setBoard={setBoard}
            setHistory={setHistory}
          />
        </div>
        <div className={`${scssObj.baseClass}__game-info title`}>
          <h1>Tic-Tac-Toe</h1>
        </div>
        <div className={`${scssObj.baseClass}__game-info`}>
          <Mode vsAI={vsAI} aiMode={aiMode} setVsAI={setVsAI} setAIMode={setAIMode} />
        </div>
      </div>
      <div className={`${scssObj.baseClass}__game-board`}>
        <Board
          squares={board}
          onClick={(i) => {
            handleClick(i);
          }}
        />
      </div>
    </div>
  );
};

export default TicTacToe;
