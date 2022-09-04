import { createAction } from 'typesafe-actions';
import { ModalSize } from '../../components/Modal';

export enum ModalTypes {
  Test = 'test',
  GameWon = 'gameWon',
}

export type ModalActionPayload =
  | { id: ModalTypes.Test }
  | {
      id: ModalTypes.GameWon;
      name?: string;
      score?: number;
      handleReplay?: () => void;
      handleReset?: () => void;
    };

export type ModalClosePayload = {
  id: ModalTypes.Test;
};

export type ModalClosePayloadConfirm = {
  id: ModalTypes.Test;
};

export const openModal = createAction('OPEN_MODAL', action => (args: ModalActionPayload) => {
  return action(args);
});

export const closeModal = createAction('CLOSE_MODAL', action => (args?: ModalClosePayload) => {
  return action(args || undefined);
});

export const closeModalConfirm = createAction(
  'CLOSE_MODAL',
  action => (args?: ModalClosePayloadConfirm) => {
    return action(args || undefined);
  },
);
