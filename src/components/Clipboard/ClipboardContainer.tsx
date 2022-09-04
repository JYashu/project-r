import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  clearClipboard,
  copyText,
  selectClipboardData,
  selectClipboardState,
  setIsClipboardVisible,
} from '../../redux/me';
import { State } from '../../redux/types';
import Clipboard from './Clipboard';

const mapState = (state: State) => ({
  clipboard: selectClipboardData(state),
  isVisible: selectClipboardState(state).isVisible,
  hideItself: selectClipboardState(state).hideItself,
});

const mapDispatch = (dispatch: Dispatch) => ({
  copyText: (text: string) => {
    dispatch(copyText.request({ text }));
  },
  hideClipboard: () => dispatch(setIsClipboardVisible({ isVisible: false, hideItself: false })),
  clearClipboard: () => dispatch(clearClipboard()),
});

export default connect(mapState, mapDispatch)(Clipboard);
