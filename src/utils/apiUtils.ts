export enum HttpMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT',
}

export enum ApiStatusType {
  Success = 'success',
  Failure = 'failure',
}

export interface ApiSuccess<Data> {
  status: number;
  type: ApiStatusType.Success;
  data: Data;
}

export interface ApiFailure {
  status: number;
  type: ApiStatusType.Failure;
  error: string;
}

export type ApiResponse<Data> = ApiSuccess<Data> | ApiFailure;

export const isApiSuccess = <T>(resp: ApiResponse<T>): resp is ApiSuccess<T> =>
  resp.type === ApiStatusType.Success;
