import { getContext, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { applicationStart } from './actions';
import { SagaContext } from '../utils/sagaContext';

export function* watchApplicationStart(
  { success, failure }: typeof applicationStart,
  action: ReturnType<typeof applicationStart.request>,
): SagaIterator<void> {
  try {
    const { payload } = action;
    const { hasAccessToken } = payload;

    if (hasAccessToken) {
      const routerHistory: SagaContext['routerHistory'] = yield getContext('routerHistory');
      routerHistory.push(`/home`);
    }

    yield put(success());
  } catch (err) {
    yield put(failure(err as any));
  }
}

export function* applicationStartSaga(): SagaIterator<void> {
  yield takeEvery(applicationStart.request, watchApplicationStart, applicationStart);
}
