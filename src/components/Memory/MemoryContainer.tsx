import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectAccessGranted } from '../../redux/me';
import { ModalTypes, openModal } from '../../redux/modal';
import { State } from '../../redux/types';
import Memory from './Memory';
import { MessageProps } from './types';
import { withState } from './utils';

const mapState = (state: State) => {
  const accessGranted = selectAccessGranted(state);

  return {
    devAccess: accessGranted.devAccess,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  openMessage: ({ name, score, handleReplay, handleReset }: MessageProps) =>
    dispatch(
      openModal({
        id: ModalTypes.GameWon,
        name,
        score,
        handleReplay,
        handleReset,
      }),
    ),
  openImage: (url: string) =>
    dispatch(
      openModal({
        id: ModalTypes.PreviewModal,
        url,
        previewType: 'img',
        transparent: true,
      }),
    ),
});

export default connect(mapState, mapDispatch)(withState(Memory));
