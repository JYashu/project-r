import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { isApiSuccess } from '../../utils/apiUtils';
import { getDefinitions, openDictionary, setIsVisible } from './actions';
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

    if (text.length > 0) {
      yield put(getDefinitions.request({ word: text }));
    }

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

export function* watchGetDefinitions(
  { success, failure }: typeof getDefinitions,
  action: ReturnType<typeof getDefinitions.request>,
): SagaIterator<void> {
  try {
    const { word } = action.payload;
    const resp: SagaReturnType<typeof Api.getDefinitions> = yield call(Api.getDefinitions, {
      word,
    });
    if (isApiSuccess(resp)) {
      yield put(success(resp, action.meta));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(failure(getErrorFromCatch(e), action.meta));
  }
}

export function* dictionarySaga(): SagaIterator<void> {
  yield takeEvery(openDictionary.request, watchOpenDictionary, openDictionary);
  yield takeEvery(getDefinitions.request, watchGetDefinitions, getDefinitions);
}
