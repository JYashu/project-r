import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { isApiSuccess } from '../../utils/apiUtils';
import { openDictionary, setIsVisible } from './actions';
import * as Api from '../../utils/api';
import getErrorFromCatch from '../utils/getErrorFromCatch';
import { addSnack } from '../snackbar';
import { SnackType } from '../../types';

export function* watchOpenDictionary(
  { success, failure }: typeof openDictionary,
  { meta }: ReturnType<typeof openDictionary.request>,
): SagaIterator<void> {
  try {
    // const { text } = action.payload;
    const text = window.getSelection()?.toString() || '';

    yield put(success({ text }));
    yield put(setIsVisible({ isVisible: true }));
  } catch (e) {
    yield put(failure(getErrorFromCatch(e), meta));
    yield put(
      addSnack({
        message: `Failed to copy read selected text.`,
        snackType: SnackType.FAILURE,
      }),
    );
  }
}

export function* dictionarySaga(): SagaIterator<void> {
  yield takeEvery(openDictionary.request, watchOpenDictionary, openDictionary);
}
