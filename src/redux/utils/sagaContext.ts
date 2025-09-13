// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export interface SagaContext {
  routerHistory: typeof history;
}
