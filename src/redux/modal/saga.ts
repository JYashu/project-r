import {
  delay,
  put,
  SagaReturnType,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { closeModal } from './actions';
import { selectPrevModal } from './selectors';

export function* watchCloseModal(
  action: ReturnType<typeof closeModal>
): SagaIterator<void> {
  try {
    const prevModal: SagaReturnType<typeof selectPrevModal> = yield select(
      selectPrevModal
    );

    // if (prevModal && 'onClose' in prevModal && prevModal.onClose) {
    //   prevModal.onClose(action.payload?.result);
    // }
  } catch (e) {
    console.warn('Something went wrong with closeModal:', e);
  }
}

export function* modalSaga(): SagaIterator<void> {
  yield takeEvery(closeModal, watchCloseModal);
}
