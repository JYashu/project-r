import { ActionType } from 'typesafe-actions';
import { NPMRepoData } from '../../types';
import { getModules } from './actions';

export interface NPMRepoState {
  isLoading: boolean;
  error: string | null;
  data: NPMRepoData[];
}

export type NPMRepoActions = ActionType<typeof getModules>;
