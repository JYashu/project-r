import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteCell, moveCell, selectCBookState, togglePreview } from '../../redux/cbook';
import { ModalTypes, openModal } from '../../redux/modal';
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

const mapDispatch = (dispatch: Dispatch, { id }: OwnProps) => ({
  moveCell: (direction: Direction) => dispatch(moveCell({ id, direction })),
  togglePreview: () => dispatch(togglePreview({ id })),
  deleteCell: () => dispatch(deleteCell({ id })),
  handleConfirmation: () =>
    dispatch(
      openModal({
        id: ModalTypes.Confirmation,
        content: 'A cell is about to escape, never to be seen again.',
        title: 'Delete Cell',
        continueText: 'Set it free!',
        cancelText: 'Grab it!',
        onConfirm: () => dispatch(deleteCell({ id })),
        dark: true,
      }),
    ),
});

export default connect(mapState, mapDispatch)(ActionBar);
