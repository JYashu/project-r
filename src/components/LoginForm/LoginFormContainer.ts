import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { State } from '../../redux/types';
import { withState } from './utils';
import LoginForm from './LoginForm';
import { completeSignIn } from '../../redux/me';

const mapState = (state: State) => ({
  user: null,
});

const mapDispatch = (dispatch: Dispatch) => ({
  onSubmit: (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      dispatch(
        completeSignIn.request(
          { username, password },
          {
            onSuccess: response => {
              resolve(response);
            },
            onFailure: reject,
          },
        ),
      );
    });
  },
});

export default connect(mapState, mapDispatch)(withState(LoginForm));
