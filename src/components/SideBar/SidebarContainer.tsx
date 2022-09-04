import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectGlobalConfig, setIsClipboardVisible } from '../../redux/me';
import {
  selectActiveSidebarItem,
  selectIsCollapsed,
  setIsCollapsed,
} from '../../redux/sidebar';
import { State } from '../../redux/types';
import Sidebar from './Sidebar';

const mapState = (state: State) => {
  return {
    config: selectGlobalConfig(state),
    isCollapsed: selectIsCollapsed(state),
    activeSidebarItem: selectActiveSidebarItem(state),
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  handleState: (isCollapsed: boolean) =>
    dispatch(setIsCollapsed({ isCollapsed })),
  showClipboard: () =>
    dispatch(setIsClipboardVisible({ isVisible: true, hideItself: false })),
});

export default connect(mapState, mapDispatch)(Sidebar);
