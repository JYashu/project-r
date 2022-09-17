import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteCell, moveCell, selectCBookState, togglePreview } from '../../redux/cbook';
import { State } from '../../redux/types';
import { Direction } from '../../types';
import ActionBar from './ActionBar';

interface OwnProps {
  id: string;
}

const mapState = (state: State, { id }: OwnProps) => ({
  visibilityIcon: selectCBookState(state).data[id].showPreview ? 'visibility_off' : 'visibility',
  cellType: selectCBookState(state).data[id].type,
});

const mapDispatch = (dispatch: Dispatch) => ({
  moveCell: (id: string, direction: Direction) => dispatch(moveCell({ id, direction })),
  deleteCell: (id: string) => dispatch(deleteCell({ id })),
  togglePreview: (id: string) => dispatch(togglePreview({ id })),
});

export default connect(mapState, mapDispatch)(ActionBar);
