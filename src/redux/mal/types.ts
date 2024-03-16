import { ActionType } from 'typesafe-actions';
import { NPMRepoData } from '../../types';
import { getAnimes } from './actions';

export interface MALState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

export type MALActions = ActionType<typeof getAnimes>;
