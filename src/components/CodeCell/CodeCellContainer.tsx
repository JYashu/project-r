import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBundle, togglePreview, updateCell } from '../../redux/cbook';
import { State } from '../../redux/types';
import { Cell } from '../../types';
import CodeCell from './CodeCell';

interface OwnProps {
  cell: Cell;
}

const mapState = (state: State, { cell }: OwnProps) => ({
  bundle: state.cbook.bundle[cell.id],
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateCell: (id: string, content: string) => dispatch(updateCell({ id, content })),
  createBundle: (cellId: string, input: string) =>
    dispatch(createBundle.request({ cellId, input })),
});

export default connect(mapState, mapDispatch)(CodeCell);
