import { NPMResponse } from '../../types';
import createAsyncActionWithMeta from '../utils/createAsyncActionWithMeta';

export const getModules = createAsyncActionWithMeta(
  'SEARCH_REPOS_REQUEST',
  'SEARCH_REPOS_SUCCESS',
  'SEARCH_REPOS_FAILURE',
)<{ query: string }, NPMResponse, Error>();
