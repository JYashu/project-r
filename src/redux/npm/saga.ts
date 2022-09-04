import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { isApiSuccess } from '../../utils/apiUtils';
import { getModules } from './actions';
import * as Api from '../../utils/api';
import getErrorFromCatch from '../utils/getErrorFromCatch';

export function* watchGetModules(
  { success, failure }: typeof getModules,
  action: ReturnType<typeof getModules.request>
): SagaIterator<void> {
  try {
    const { query } = action.payload;
    const resp: SagaReturnType<typeof Api.getModules> = yield call(
      Api.getModules,
      {
        query,
      }
    );

    if (isApiSuccess(resp)) {
      yield put(success(resp.data, action.meta));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(failure(getErrorFromCatch(e), action.meta));
  }
}

export function* NPMSaga(): SagaIterator<void> {
  yield takeEvery(getModules.request, watchGetModules, getModules);
}
