import { destroyTokens } from './requestTokens';

const LOGGED_OUT_DESTINATION = '/project-r';

export default (logOutLocation: string = LOGGED_OUT_DESTINATION) => {
  destroyTokens();
  window.location.assign(logOutLocation);
};
