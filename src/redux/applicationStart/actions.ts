import createAsyncActionWithMeta from '../utils/createAsyncActionWithMeta';

export const applicationStart = createAsyncActionWithMeta(
  'APPLICATION_START_REQUEST',
  'APPLICATION_START_SUCCESS',
  'APPLICATION_START_FAILURE',
)<{ hasAccessToken: boolean }, void, Error>();
