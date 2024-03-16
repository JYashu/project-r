import { createAction } from 'typesafe-actions';
import { ActiveNavigationItem } from '../../types';

export const setIsNavOpen = createAction(
  'SET_IS_NAV_OPEN',
  (action) => (payload: { isOpen: boolean }) => action(payload),
);

export const setIsGamesOpen = createAction(
  'SET_IS_GAMES_OPEN',
  (action) => (payload: { isOpen: boolean }) => action(payload),
);

export const setActiveNavigationItem = createAction(
  'SET_ACTIVE_NAVIGATION_ITEM',
  (action) => (payload: { activeNavigationItem: ActiveNavigationItem }) => action(payload),
);
