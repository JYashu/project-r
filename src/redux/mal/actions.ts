import createAsyncActionWithMeta from '../utils/createAsyncActionWithMeta';

export const getAnimes = createAsyncActionWithMeta(
  'GET_ANIMES_REQUEST',
  'GET_ANIMES_SUCCESS',
  'GET_ANIMES_FAILURE'
)<{ query: string }, any, Error>();
