import { ActionType } from 'typesafe-actions';
import { getGifs } from './actions';

export interface GIFRepoState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

export type GIFRepoActions = ActionType<typeof getGifs>;
