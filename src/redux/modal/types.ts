import { ModalSize } from '../../components/modal/types';
import {
  ModalActionPayload,
  openModal,
  closeModal,
  cancelDoubleConfirmation,
  confirmDoubleConfirmation,
  closeDoubleConfirmation,
} from './actions';

export type ModalStateModal = ModalActionPayload & {
  uuid: string;
  size?: ModalSize;
  cancellable?: boolean;
};

export type ModalActions =
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof cancelDoubleConfirmation>
  | ReturnType<typeof closeDoubleConfirmation>
  | ReturnType<typeof confirmDoubleConfirmation>;

export type ModalState = {
  modals: ModalStateModal[];
  prevModal: ModalStateModal | undefined;
};
