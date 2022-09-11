import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { openDictionary, selectIsDictionaryVisible } from '../../redux/dictionary';
import { selectIsContentStatic, setIsClipboardVisible } from '../../redux/me';
import { State } from '../../redux/types';
import App from './App';

const mapState = (state: State) => {
  return {
    isDictionaryVisible: selectIsDictionaryVisible(state),
    isContentStatic: selectIsContentStatic(state),
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  showClipboard: () => dispatch(setIsClipboardVisible({ isVisible: true, hideItself: true })),
  openDictionary: () => dispatch(openDictionary.request()),
});

export default connect(mapState, mapDispatch)(App);
