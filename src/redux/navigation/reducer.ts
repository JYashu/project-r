import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { ActiveNavigationItem } from '../../types';
import { setActiveNavigationItem, setIsNavOpen, setIsGamesOpen } from './actions';
import { NavigationActions, NavigationState } from './types';

const initialState: NavigationState = {
  isOpen: false,
  activeNavigationItem: ActiveNavigationItem.None,
  isGamesOpen: false,
};

/* eslint-disable no-param-reassign */
export default createReducer<NavigationState, NavigationActions>(initialState)
  .handleAction(setIsNavOpen, (state, { payload: { isOpen } }) =>
    produce(state, (draft) => {
      draft.isOpen = isOpen;
    }),
  )
  .handleAction(setIsGamesOpen, (state, { payload: { isOpen } }) =>
    produce(state, (draft) => {
      draft.isGamesOpen = isOpen;
    }),
  )
  .handleAction(setActiveNavigationItem, (state, { payload: { activeNavigationItem } }) =>
    produce(state, (draft) => {
      draft.activeNavigationItem = activeNavigationItem;
    }),
  );
