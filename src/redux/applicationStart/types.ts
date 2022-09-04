import { ActionType } from 'typesafe-actions';

import { applicationStart } from './actions';

export type ApplicationStartActions = ActionType<typeof applicationStart>;
