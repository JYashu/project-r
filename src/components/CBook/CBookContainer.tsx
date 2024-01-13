import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { insertCellAfter, loadFileData } from '../../redux/cbook';
import { addSnack } from '../../redux/snackbar';
import { State } from '../../redux/types';
import { CellTypes } from '../../types';
import CBook from './CBook';

const mapState = (state: State) => ({
  order: state.cbook.order,
  data: state.cbook.data,
});

const mapDispatch = (dispatch: Dispatch) => ({
  insertCellAfter: (id: string | null, cellType: CellTypes) =>
    dispatch(insertCellAfter({ id, cellType })),
  loadFile: (content: string, resetBook: boolean) => dispatch(loadFileData({ content, resetBook })),
  addSnackbar: (message: string) => dispatch(addSnack({ message })),
});

export default connect(mapState, mapDispatch)(CBook);
