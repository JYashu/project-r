import { AnyAction } from 'redux';
import { all, fork, takeEvery } from 'redux-saga/effects';

import { NPMSaga } from './npm/saga';
import { GiphySaga } from './giphy/saga';
import { modalSaga } from './modal/saga';
import { meSaga } from './me/saga';
import { MALSaga } from './mal/saga';
import { applicationStartSaga } from './applicationStart/saga';

function* watchAsyncMeta(key: string, action: AnyAction) {
  const { payload, meta } = action;

  if (key === 'onFailure') {
    console.error(action); // eslint-disable-line
  }

  if (meta && typeof meta === 'object' && typeof meta[key] === 'function') {
    yield meta[key](payload);
  }
}

function* metaCallbackSaga() {
  yield takeEvery(
    (action: AnyAction) => /_SUCCESS$/.test(action.type),
    watchAsyncMeta,
    'onSuccess',
  );
  yield takeEvery(
    (action: AnyAction) => /_FAILURE$/.test(action.type),
    watchAsyncMeta,
    'onFailure',
  );
}

function* rootSaga() {
  yield all([
    fork(NPMSaga),
    fork(GiphySaga),
    fork(metaCallbackSaga),
    fork(modalSaga),
    fork(meSaga),
    fork(MALSaga),
    fork(applicationStartSaga),
  ]);
}

export default rootSaga;
