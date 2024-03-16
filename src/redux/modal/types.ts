import { ModalSize } from '../../components/modal/types';
import {
  ModalActionPayload,
  openModal,
  closeModal,
  cancelConfirmation,
  closeConfirmation,
  confirmConfirmation,
} from './actions';

export type ModalStateModal = ModalActionPayload & {
  uuid: string;
  size?: ModalSize;
  cancellable?: boolean;
};

export type ModalActions =
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof cancelConfirmation>
  | ReturnType<typeof closeConfirmation>
  | ReturnType<typeof confirmConfirmation>;

export type ModalState = {
  modals: ModalStateModal[];
  prevModal: ModalStateModal | undefined;
};
