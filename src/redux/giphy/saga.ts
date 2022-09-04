import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { isApiSuccess } from '../../utils/apiUtils';
import { getGifs } from './actions';
import * as Api from '../../utils/api';
import getErrorFromCatch from '../utils/getErrorFromCatch';

export function* watchGetGifs(
  { success, failure }: typeof getGifs,
  action: ReturnType<typeof getGifs.request>
): SagaIterator<void> {
  try {
    const { query } = action.payload;
    const resp: SagaReturnType<typeof Api.getGifs> = yield call(Api.getGifs, {
      query,
    });

    if (isApiSuccess(resp)) {
      yield put(success(resp.data, action.meta));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(failure(getErrorFromCatch(e), action.meta));
  }
}

export function* GiphySaga(): SagaIterator<void> {
  yield takeEvery(getGifs.request, watchGetGifs, getGifs);
}
