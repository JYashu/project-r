import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  getGifs,
  selectGIFRepoData,
  selectGIFRepoState,
} from '../../redux/giphy';
import { State } from '../../redux/types';
import GiphySearchEngine from './GiphySearchEngine';
import { Values } from './types';
import { withState } from './utils';

const mapState = (state: State) => {
  const data = selectGIFRepoData(state);
  const { isLoading, error } = selectGIFRepoState(state);

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
        getGifs.request(
          { query },
          {
            onSuccess: (response) => {
              resolve(response);
            },
            onFailure: reject,
          }
        )
      );
    });
  },
});

export default connect(mapState, mapDispatch)(withState(GiphySearchEngine));
