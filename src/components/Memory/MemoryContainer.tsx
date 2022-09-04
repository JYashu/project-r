import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ModalTypes, openModal } from '../../redux/modal';
import Memory from './Memory';
import { MessageProps } from './types';
import { withState } from './utils';

const mapDispatch = (dispatch: Dispatch) => ({
  openMessage: ({ name, score, handleReplay, handleReset }: MessageProps) =>
    dispatch(
      openModal({
        id: ModalTypes.GameWon,
        name,
        score,
        handleReplay,
        handleReset,
      })
    ),
});

export default connect(null, mapDispatch)(withState(Memory));
