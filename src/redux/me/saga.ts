import { SagaIterator } from 'redux-saga';
import { call, getContext, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { completeSignIn, copyText } from './actions';
import getErrorFromCatch from '../utils/getErrorFromCatch';
import { addSnack } from '../snackbar';
import { SnackType } from '../../types';
import requestTokens, { persistTokens } from '../../utils/requestTokens';
import { SagaContext } from '../utils/sagaContext';

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

export function* watchCompleteSignInRequest(
  { success, failure }: typeof completeSignIn,
  { payload }: ReturnType<typeof completeSignIn.request>,
): SagaIterator<void> {
  try {
    const { username, password } = payload;

    const tokens: SagaReturnType<typeof requestTokens> = yield call(requestTokens, {
      username,
      password,
    });

    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new Error(`Invalid tokens: ${tokens}`);
    }
    persistTokens(tokens);

    const routerHistory: SagaContext['routerHistory'] = yield getContext('routerHistory');

    setTimeout(() => routerHistory.push(`/auth`), 4000);

    yield put(success());
  } catch (e) {
    yield put(failure(getErrorFromCatch(e)));
  }
}

export function* meSaga(): SagaIterator<void> {
  yield takeEvery(copyText.request, watchCopyText, copyText);
  yield takeEvery(completeSignIn.request, watchCompleteSignInRequest, completeSignIn);
}
