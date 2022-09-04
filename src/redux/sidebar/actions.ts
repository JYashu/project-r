import { createAction } from 'typesafe-actions';
import { ActiveSidebarItem } from '../../types';

export const setIsCollapsed = createAction(
  'SET_IS_COLLAPSED',
  (action) => (payload: { isCollapsed: boolean }) => action(payload)
);

export const setIsGamesOpen = createAction(
  'SET_IS_GAMES_OPEN',
  (action) => (payload: { isOpen: boolean }) => action(payload)
);

export const setActiveSidebarItem = createAction(
  'SET_ACTIVE_SIDEBAR_ITEM',
  (action) => (payload: { activeSidebarItem: ActiveSidebarItem }) =>
    action(payload)
);

// export const setIsAccountsOpen = createAction(
//   'SET_IS_ACCOUNTS_OPEN',
//   action => (payload: { isAccountsOpen: boolean }) => action(payload),
// );

// export const setIsSettingsOpen = createAction(
//   'SET_IS_SETTINGS_OPEN',
//   action => (payload: { isSettingsOpen: boolean }) => action(payload),
// );

// export const setIsIntegrationsOpen = createAction(
//   'SET_IS_INTEGRATIONS_OPEN',
//   action => (payload: { isIntegrationsOpen: boolean }) => action(payload),
// );

// export const setActiveSidebarItem = createAction(
//   'SET_ACTIVE_SIDEBAR_ITEM',
//   action => (payload: { activeSidebarItem: ActiveSidebarItem }) => action(payload),
// );

// export const setIsBookkeepingOpen = createAction(
//   'SET_IS_BOOKKEEPING_OPEN',
//   action => (payload: { isBookkeepingOpen: boolean }) => action(payload),
// );

// export const setIsMemberBenefitsOpen = createAction(
//   'SET_IS_MEMBER_BENEFITS_OPEN',
//   action => (payload: { isMemberBenefitsOpen: boolean }) => action(payload),
// );
