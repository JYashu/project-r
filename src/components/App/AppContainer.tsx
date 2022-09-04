import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectGlobalConfig, selectIsContentStatic, setIsClipboardVisible } from '../../redux/me';
import { State } from '../../redux/types';
import App from './App';

const mapState = (state: State) => {
  return {
    config: selectGlobalConfig(state),
    isContentStatic: selectIsContentStatic(state),
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  showClipboard: () => dispatch(setIsClipboardVisible({ isVisible: true, hideItself: true })),
});

export default connect(mapState, mapDispatch)(App);
