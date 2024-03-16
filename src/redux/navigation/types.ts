import { ActiveNavigationItem } from '../../types';
import { setActiveNavigationItem, setIsNavOpen, setIsGamesOpen } from './actions';

export interface NavigationState {
  isOpen: boolean;
  activeNavigationItem: ActiveNavigationItem;
  isGamesOpen: boolean;
}

export type NavigationActions =
  | ReturnType<typeof setIsNavOpen>
  | ReturnType<typeof setIsGamesOpen>
  | ReturnType<typeof setActiveNavigationItem>;
