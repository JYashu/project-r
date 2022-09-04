import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import TicTacToe from './TicTacToe';
import {
  setOpen,
  setXIsNext,
  setStepNumber,
  setBoard,
  setHistory,
  selectTicTacToeState,
  setVsAI,
  setAIMode,
} from '../../redux/tictactoe';
import { State } from '../../redux/types';
import { AIMode } from '../../types';

const mapState = (state: State) => {
  const gameState = selectTicTacToeState(state);
  return {
    gameState,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  setOpen: () => dispatch(setOpen()),
  setXIsNext: (xIsNext: boolean) => dispatch(setXIsNext({ xIsNext })),
  setStepNumber: (step: number) => dispatch(setStepNumber({ step })),
  setBoard: (board: any) => dispatch(setBoard({ board })),
  setHistory: (history: any) => dispatch(setHistory({ history })),
  setVsAI: (vsAI: boolean) => dispatch(setVsAI({ vsAI })),
  setAIMode: (mode: AIMode) => dispatch(setAIMode({ mode })),
});

export default connect(mapState, mapDispatch)(TicTacToe);
