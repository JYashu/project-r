import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { ActiveSidebarItem } from '../../types';
import { setActiveSidebarItem, setIsCollapsed, setIsGamesOpen } from './actions';
import { SidebarActions, SidebarState } from './types';

const initialState: SidebarState = {
  isCollapsed: true,
  activeSidebarItem: ActiveSidebarItem.None,
  isGamesOpen: false,
};

/* eslint-disable no-param-reassign */
export default createReducer<SidebarState, SidebarActions>(initialState)
  .handleAction(setIsCollapsed, (state, { payload: { isCollapsed } }) =>
    produce(state, draft => {
      draft.isCollapsed = isCollapsed;
    }),
  )
  .handleAction(setIsGamesOpen, (state, { payload: { isOpen } }) =>
    produce(state, draft => {
      draft.isGamesOpen = isOpen;
    }),
  )
  .handleAction(setActiveSidebarItem, (state, { payload: { activeSidebarItem } }) =>
    produce(state, draft => {
      draft.activeSidebarItem = activeSidebarItem;
    }),
  );
