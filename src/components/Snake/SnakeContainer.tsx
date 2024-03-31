import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  makeMove,
  scoreUpdates,
  selectSnakeState,
  generateTreat,
  stopGame,
  handleTreatConsumed,
  setInPlay,
  resetGame,
} from '../../redux/snake';
import { State } from '../../redux/types';
import Snake from './Snake';
import { Coordinates } from '../../types';

const mapState = (state: State) => ({
  score: selectSnakeState(state).score,
  snake: selectSnakeState(state).snake,
  disallowedDirection: selectSnakeState(state).disallowedDirection,
  treat: selectSnakeState(state).treat,
  inPlay: selectSnakeState(state).inPlay,
  consumedTreats: selectSnakeState(state).consumedTreats,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateScore: (reset?: boolean) => dispatch(scoreUpdates({ reset })),
  move: (direction: string, dx: number, dy: number) => dispatch(makeMove({ direction, dx, dy })),
  handleTreatConsumed: (treat: Coordinates) => dispatch(handleTreatConsumed({ treat })),
  stopGame: () => dispatch(stopGame()),
  generateTreat: (width: number, height: number) => dispatch(generateTreat({ width, height })),
  setInPlay: (inPlay: boolean) => dispatch(setInPlay({ inPlay })),
  resetGame: (width: number, height: number) => dispatch(resetGame({ width, height })),
});

export default connect(mapState, mapDispatch)(Snake);
