import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updateCell } from '../../redux/cbook';
import TextEditor from './TextEditor';

const mapDispatch = (dispatch: Dispatch) => ({
  updateCell: (id: string, content: string) => dispatch(updateCell({ id, content })),
});

export default connect(undefined, mapDispatch)(TextEditor);
