import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { isApiSuccess } from '../../utils/apiUtils';
import { getAnimes } from './actions';
import * as Api from '../../utils/api';
import getErrorFromCatch from '../utils/getErrorFromCatch';

export function* watchGetModules(
  { success, failure }: typeof getAnimes,
  action: ReturnType<typeof getAnimes.request>
): SagaIterator<void> {
  try {
    const { query } = action.payload;
    const resp: SagaReturnType<typeof Api.getAnime> = yield call(Api.getAnime, {
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

export function* MALSaga(): SagaIterator<void> {
  yield takeEvery(getAnimes.request, watchGetModules, getAnimes);
}
