import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectGlobalHeaderTitle, setGlobalHeader, setIsContentStatic } from '../../redux/me';
import { selectIsCollapsed, setIsCollapsed } from '../../redux/sidebar';
import { selectSnakeState } from '../../redux/snake';
import { State } from '../../redux/types';
import { Pages } from '../../utils/consts';
import GlobalHeader from './GlobalHeader';

const mapState = (state: State) => {
  const title = selectGlobalHeaderTitle(state);

  return {
    title,
    isCollapsed: selectIsCollapsed(state),
    snakeScore: selectSnakeState(state).score,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  setGlobalTitle: (title: Pages) => dispatch(setGlobalHeader({ title })),
  handleSideBarState: (isCollapsed: boolean) => dispatch(setIsCollapsed({ isCollapsed })),
  handleStaticContent: (isStatic: boolean) => dispatch(setIsContentStatic({ isStatic })),
});

export default connect(mapState, mapDispatch)(GlobalHeader);
