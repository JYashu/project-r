import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  getDefinitions,
  selectDefinitions,
  selectDictionaryState,
  selectSelectedText,
  setIsVisible,
} from '../../redux/dictionary';
import { State } from '../../redux/types';
import Dictionary from './Dictionary';

const mapState = (state: State) => ({
  selectedText: selectSelectedText(state),
  isVisible: selectDictionaryState(state).isVisible,
  isLoading: selectDictionaryState(state).isLoading,
  definitions: selectDefinitions(state),
  error: selectDictionaryState(state).error,
});

const mapDispatch = (dispatch: Dispatch) => ({
  hideDictionary: () => dispatch(setIsVisible({ isVisible: false })),
  getDefinitions: (word: string) =>
    new Promise((resolve, reject) => {
      dispatch(
        getDefinitions.request(
          { word },
          {
            onSuccess: response => {
              resolve(response);
            },
            onFailure: reject,
          },
        ),
      );
    }),
});

export default connect(mapState, mapDispatch)(Dictionary);
