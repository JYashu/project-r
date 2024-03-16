import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getModules, selectNPMRepoData, selectNPMRepoState } from '../../redux/npm';
import { addSnack } from '../../redux/snackbar';
import { State } from '../../redux/types';
import NPMRepoEngine from './NPMRepoEngine';
import { Values } from './types';
import { withState } from './utils';

const mapState = (state: State) => {
  const data = selectNPMRepoData(state);
  const { isLoading, error } = selectNPMRepoState(state);
  return {
    data,
    isLoading,
    error,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  onSubmit: ({ query }: Values) => {
    return new Promise((resolve, reject) => {
      dispatch(
        getModules.request(
          { query },
          {
            onSuccess: (response) => {
              resolve(response);
            },
            onFailure: reject,
          },
        ),
      );
    });
  },
});

export default connect(mapState, mapDispatch)(withState(NPMRepoEngine));
