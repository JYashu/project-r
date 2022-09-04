import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { createReducer } from 'typesafe-actions';

import { ModalState, ModalActions } from './types';
import { openModal, closeModal, ModalTypes } from './actions';

const initialState = {
  modals: [],
  prevModal: undefined,
};

/* eslint-disable no-param-reassign */
const handleCloseModal = (draft: ModalState) => {
  const modal = draft.modals.shift();
  draft.prevModal = modal;
  return draft;
};

export default createReducer<ModalState, ModalActions>(initialState)
  .handleAction(openModal, (state: ModalState, { payload }) =>
    produce(state, draft => {
      draft.modals.unshift({ ...payload, uuid: uuidv4() });
      return draft;
    }),
  )
  .handleAction(closeModal, (state: ModalState) => produce(state, handleCloseModal));

/* eslint-enable no-param-reassign */
