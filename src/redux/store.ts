/* eslint-disable @typescript-eslint/no-var-requires */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import reducers from './rootReducer';
import { SagaContext } from './utils/sagaContext';

export default (
  context: SagaContext,
  // state?: Partial<State>,
  disableSagas?: boolean
) => {
  const sagaMiddleware = createSagaMiddleware({ context });

  const middlewares = [];

  if (!disableSagas) {
    middlewares.push(sagaMiddleware);
  }

  middlewares.push(thunk);

  const store = createStore(reducers, {}, applyMiddleware(...middlewares));

  sagaMiddleware.run(require('./rootSaga').default);

  return store;
};
