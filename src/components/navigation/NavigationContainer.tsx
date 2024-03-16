import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Navigation from './Navigation';
import { State } from '../../redux/types';
import { selectActiveNavigationItem, selectIsNavOpen, setIsNavOpen } from '../../redux/navigation';
import { setIsClipboardVisible } from '../../redux/me';
import { openDictionary } from '../../redux/dictionary';

const mapState = (state: State) => ({
  isNavigationOpen: selectIsNavOpen(state),
  activeNavigationItem: selectActiveNavigationItem(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  showClipboard: () => dispatch(setIsClipboardVisible({ isVisible: true, hideItself: false })),
  showDictionary: () => dispatch(openDictionary.request()),
  collapseNavigation: () => dispatch(setIsNavOpen({ isOpen: false })),
});

export default connect(mapState, mapDispatch)(Navigation);
