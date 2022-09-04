import { ActiveSidebarItem } from '../../types';
import { State } from '../types';

export const selectSidebarState = (state: State) => state.sidebar;

export const selectIsCollapsed = (state: State) => {
  const sidebar = selectSidebarState(state);
  return sidebar ? sidebar.isCollapsed : false;
};

export const selectActiveSidebarItem = (state: State) => {
  return selectSidebarState(state).activeSidebarItem;
};

export const selectIsGamesOpen = (state: State) => {
  const sidebar = selectSidebarState(state);
  return sidebar ? sidebar.isGamesOpen : false;
};
