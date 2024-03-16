import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { copyText } from '../../redux/me';
import { addSnack } from '../../redux/snackbar';
import SpinnerPage from './SpinnerPage';

const mapDispatch = (dispatch: Dispatch) => ({
  copyText: (text: string) => {
    dispatch(copyText.request({ text }));
  },
});

export default connect(undefined, mapDispatch)(SpinnerPage);
