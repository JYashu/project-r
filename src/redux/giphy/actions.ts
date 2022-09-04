import { GiphyResponse } from '../../types';
import createAsyncActionWithMeta from '../utils/createAsyncActionWithMeta';

export const getGifs = createAsyncActionWithMeta(
  'SEARCH_GIFS_REQUEST',
  'SEARCH_GIFS_SUCCESS',
  'SEARCH_GIFS_FAILURE',
)<{ query: string }, GiphyResponse, Error>();
