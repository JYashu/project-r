import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectGlobalHeaderTitle, setGlobalHeader, setIsContentStatic } from '../../redux/me';
import { selectIsNavOpen, setIsNavOpen } from '../../redux/navigation';
import { selectSnakeState } from '../../redux/snake';
import { State } from '../../redux/types';
import { Pages } from '../../utils/consts';
import GlobalHeader from './GlobalHeader';

const mapState = (state: State) => {
  const title = selectGlobalHeaderTitle(state);

  return {
    title,
    isOpen: selectIsNavOpen(state),
    snakeScore: selectSnakeState(state).score,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  setGlobalTitle: (title: Pages) => dispatch(setGlobalHeader({ title })),
  handleNavigationState: (isOpen: boolean) => dispatch(setIsNavOpen({ isOpen })),
  handleStaticContent: (isStatic: boolean) => dispatch(setIsContentStatic({ isStatic })),
});

export default connect(mapState, mapDispatch)(GlobalHeader);
