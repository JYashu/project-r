import { createAction } from 'typesafe-actions';
import { ModalSize } from '../../components/modal';

export enum ModalTypes {
  Test = 'test',
  GameWon = 'gameWon',
  Confirmation = 'confirmation',
  PreviewModal = 'previewModal',
}

export type ModalActionPayload =
  | { id: ModalTypes.Test; delay: number }
  | {
      id: ModalTypes.GameWon;
      name?: string;
      score?: number;
      handleReplay?: () => void;
      handleReset?: () => void;
    }
  | {
      id: ModalTypes.Confirmation;
      content: React.ReactNode | string;
      icon?: string;
      title: string;
      onConfirm?: () => void;
      onCancel?: () => void;
      cancelText?: string;
      continueText?: string;
      hasBackButton?: boolean;
      dark?: boolean;
    }
  | {
      id: ModalTypes.PreviewModal;
      url?: string;
      fileId?: string;
      previewType: 'img' | 'file';
      transparent?: boolean;
    };

export type ModalClosePayload = {
  id: ModalTypes.Test;
};

export type ModalClosePayloadConfirm = {
  id: ModalTypes.Test;
};

export const openModal = createAction('OPEN_MODAL', (action) => (args: ModalActionPayload) => {
  return action(args);
});

export const closeModal = createAction('CLOSE_MODAL', (action) => (args?: ModalClosePayload) => {
  return action(args || undefined);
});

export const closeModalConfirm = createAction(
  'CLOSE_MODAL',
  (action) => (args?: ModalClosePayloadConfirm) => {
    return action(args || undefined);
  },
);

export const cancelDoubleConfirmation = createAction('CANCEL_DOUBLE_CONFIRMATION');
export const closeDoubleConfirmation = createAction('CLOSE_DOUBLE_CONFIRMATION');
export const confirmDoubleConfirmation = createAction('CONFIRM_DOUBLE_CONFIRMATION');
