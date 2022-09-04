/* eslint-disable indent */
import { createAction } from 'typesafe-actions';

import { MetaCallback } from '../../types';

const createAsyncActionWithMeta = <
  RequestType extends string,
  SuccessType extends string,
  FailureType extends string
>(
  requestType: RequestType,
  successType: SuccessType,
  failureType: FailureType,
) => {
  return <TRequest, TSuccess, TFailure>() => ({
    request: createAction(
      requestType,
      action => (payload: TRequest, meta?: MetaCallback<TRequest, TSuccess, TFailure>) =>
        action(payload, meta),
    ),
    success: createAction(
      successType,
      action => (payload: TSuccess, meta?: MetaCallback<TRequest, TSuccess, TFailure>) =>
        action(payload, meta),
    ),
    failure: createAction(
      failureType,
      action => (payload: TFailure, meta?: MetaCallback<TRequest, TSuccess, TFailure>) =>
        action(payload, meta),
    ),
  });
};

export default createAsyncActionWithMeta;
