import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FileType } from '../../elements/field/types';
import { setToFrom } from '../../redux/converter';
import IMGConverter from './IMGConverter';
import { withState } from './utils';

const mapDispatch = (dispatch: Dispatch) => ({
  setFields: (from: FileType, to: FileType) =>
    dispatch(
      setToFrom({
        from,
        to,
      }),
    ),
});

export default connect(undefined, mapDispatch)(withState(IMGConverter));
