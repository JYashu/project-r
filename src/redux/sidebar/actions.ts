import { createAction } from 'typesafe-actions';
import { ActiveSidebarItem } from '../../types';

export const setIsCollapsed = createAction(
  'SET_IS_COLLAPSED',
  action => (payload: { isCollapsed: boolean }) => action(payload),
);

export const setIsGamesOpen = createAction(
  'SET_IS_GAMES_OPEN',
  action => (payload: { isOpen: boolean }) => action(payload),
);

export const setActiveSidebarItem = createAction(
  'SET_ACTIVE_SIDEBAR_ITEM',
  action => (payload: { activeSidebarItem: ActiveSidebarItem }) => action(payload),
);
