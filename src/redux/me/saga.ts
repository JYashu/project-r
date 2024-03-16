import { SagaIterator } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import { copyText } from './actions';
import getErrorFromCatch from '../utils/getErrorFromCatch';
import { addSnack } from '../snackbar';
import { SnackType } from '../../types';

export function* watchCopyText(
  { success, failure }: typeof copyText,
  action: ReturnType<typeof copyText.request>,
): SagaIterator<void> {
  try {
    const { text } = action.payload;
    navigator.clipboard.writeText(text);

    yield put(success(action.payload, action.meta));
    yield put(
      addSnack({
        message: `Copied "${
          text.length > 16 ? `${text.substring(0, 16)}...` : text
        }" to clipboard.`,
      }),
    );
  } catch (e) {
    yield put(failure(getErrorFromCatch(e), action.meta));
    yield put(
      addSnack({
        message: `Failed to copy text to clipboard.`,
        snackType: SnackType.FAILURE,
      }),
    );
  }
}

export function* meSaga(): SagaIterator<void> {
  yield takeEvery(copyText.request, watchCopyText, copyText);
}
