import { ApiFailure } from '../../utils/apiUtils';

export default (e: any): Error => {
  if (e instanceof Error) {
    return e;
  }

  return new Error((e as ApiFailure).error);
};
