import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { insertCellAfter } from '../../redux/cbook';
import { CellTypes } from '../../types';
import AddCell from './AddCell';

const mapDispatch = (dispatch: Dispatch) => ({
  insertCellAfter: (id: string | null, cellType: CellTypes) =>
    dispatch(insertCellAfter({ id, cellType })),
});

export default connect(undefined, mapDispatch)(AddCell);
