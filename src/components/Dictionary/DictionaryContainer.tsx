import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectDictionaryState, selectSelectedText, setIsVisible } from '../../redux/dictionary';
import { State } from '../../redux/types';
import Dictionary from './Dictionary';

const mapState = (state: State) => ({
  selectedText: selectSelectedText(state),
  isVisible: selectDictionaryState(state).isVisible,
});

const mapDispatch = (dispatch: Dispatch) => ({
  hideDictionary: () => dispatch(setIsVisible({ isVisible: false })),
});

export default connect(mapState, mapDispatch)(Dictionary);
