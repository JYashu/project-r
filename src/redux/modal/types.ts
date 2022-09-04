import { ModalSize } from '../../components/Modal/types';
import { ModalActionPayload, openModal, closeModal } from './actions';

export type ModalStateModal = ModalActionPayload & {
  uuid: string;
  size?: ModalSize;
  cancellable?: boolean;
};

export type ModalActions =
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>;

export type ModalState = {
  modals: ModalStateModal[];
  prevModal: ModalStateModal | undefined;
};
