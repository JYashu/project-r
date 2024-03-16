import { State } from '../types';

export const selectNavigationState = (state: State) => state.navigation;

export const selectIsNavOpen = (state: State) => {
  const navigation = selectNavigationState(state);
  return navigation ? navigation.isOpen : false;
};

export const selectActiveNavigationItem = (state: State) => {
  return selectNavigationState(state).activeNavigationItem;
};

export const selectIsGamesOpen = (state: State) => {
  const navigation = selectNavigationState(state);
  return navigation ? navigation.isGamesOpen : false;
};
