import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  makeMove,
  scoreUpdates,
  selectSnakeState,
  setMock,
  stopGame,
  increaseSnake,
  setInPlay,
} from '../../redux/snake';
import { State } from '../../redux/types';
import Snake from './Snake';

const mapState = (state: State) => ({
  score: selectSnakeState(state).score,
  snake: selectSnakeState(state).snake,
  disallowedDirection: selectSnakeState(state).disallowedDirection,
  mock: selectSnakeState(state).mock,
  inPlay: selectSnakeState(state).inPlay,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateScore: (reset?: boolean) => dispatch(scoreUpdates({ reset })),
  move: (direction: string, dx: number, dy: number) =>
    dispatch(makeMove({ direction, dx, dy })),
  increaseSnake: () => dispatch(increaseSnake()),
  stopGame: () => dispatch(stopGame()),
  setMock: () => dispatch(setMock()),
  setInPlay: (inPlay: boolean) => dispatch(setInPlay({ inPlay })),
});

export default connect(mapState, mapDispatch)(Snake);
