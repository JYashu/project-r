import { State } from '../types';

export const selectModalState = (state: State) => state.modal;
export const selectModalsState = (state: State) => selectModalState(state).modals;
export const selectPrevModal = (state: State) => selectModalState(state).prevModal;
