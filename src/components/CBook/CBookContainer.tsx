import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { insertCellAfter } from '../../redux/cbook';
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
});

export default connect(mapState, mapDispatch)(CBook);
