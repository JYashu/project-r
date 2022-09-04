import { ActiveSidebarItem } from '../../types';
import {
  setActiveSidebarItem,
  setIsCollapsed,
  setIsGamesOpen,
} from './actions';

export interface SidebarState {
  isCollapsed: boolean;
  activeSidebarItem: ActiveSidebarItem;
  isGamesOpen: boolean;
}

export type SidebarActions =
  | ReturnType<typeof setIsCollapsed>
  | ReturnType<typeof setIsGamesOpen>
  | ReturnType<typeof setActiveSidebarItem>;
