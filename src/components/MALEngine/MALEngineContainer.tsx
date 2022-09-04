import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getAnimes } from '../../redux/mal';
import MALEngine from './MALEngine';
import { Values } from './types';
import { withState } from './utils';

const mapDispatch = (dispatch: Dispatch) => ({
  onSubmit: ({ query }: Values) => {
    return new Promise((resolve, reject) => {
      dispatch(
        getAnimes.request(
          { query },
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

export default connect(null, mapDispatch)(withState(MALEngine));
